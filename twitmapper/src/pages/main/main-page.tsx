import * as React from 'react';
import { Chip, TextField, Button, Collapse, List, ListItem, ListItemButton, ListItemText, Stack, Divider } from '@mui/material';
import { StackPanel } from 'src/ui';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Map } from './map';
import { withRouter, RouterProps, resetSession } from 'src/features';
import { Navigate } from 'react-router-dom';
import { CreateTwitModal } from './CreateTwitModal';
import { ShowTwitModal } from './ShowTwitModal';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Twit } from "src/models";

type MainPageProps = {
    login: string,
    authKey: string,
    router: RouterProps,
} 

function MainPage(props: MainPageProps) {
    const [createTwitOpen, setCreateTwitOpen] = useState( { open: false, lat: 0, lon: 0 } );
    const handleCreateTwitOpen = (lat: number, lon: number) => setCreateTwitOpen( { open: true, lat: lat, lon: lon } );
    const handleCreateTwitClose = () => setCreateTwitOpen( {open: false,  lat: 0, lon: 0} );

    const [showTwitOpen, setShowTwitOpen] = useState( { open: false, id: 0 } );
    const handleShowTwitOpen = (id: number) => setShowTwitOpen( { open: true, id: id } );
    const handleShowTwitClose = () => setShowTwitOpen( {open: false,  id: 0 } );

    const [collapsedListOpen, setCollapsedListOpen] = useState(false);
    function changeCollapsedListOpen() {
        setCollapsedListOpen(!collapsedListOpen);
    }

    const [twits, setTwits] = React.useState( [] );
    const requestTwits = () => {
        axios.get(`http://127.0.0.1:8080/twits`)
            .then(response => {
                setTwits(response.data.data);
            })
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        requestTwits();
    }, [])

    function onLogOut() {
        resetSession();
        props.router.navigate("/login")
    }

    const [foundTwits, setFoundTwits] = React.useState<Array<Twit>>( [] );
    function findTwits(query: string) {
        axios.get(`http://127.0.0.1:8080/find-twit?query=${query}&count=5`)
            .then(response => {
                setFoundTwits(response.data.data);
            })
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function onFindTwits(event: any){
        event.preventDefault();

        findTwits(event.target.text.value);
    }

    function onSubmitTwit(event: any) {
        event.preventDefault();

        const req = {
            text: event.target.text.value,
            lat: createTwitOpen.lat,
            lon: createTwitOpen.lon
        }

        axios.post(`http://127.0.0.1:8080/create-twit`, req)
            .then(response => {
                requestTwits();
            })
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function onDeleteTwit(id: number){
        axios.delete(`http://127.0.0.1:8080/delete-twit?id=${id}`, )
            .then(response => {
                handleShowTwitClose();
                if (foundTwits.some(twit => twit.id === id)){
                    setFoundTwits(foundTwits.filter(twits => twits.id !== id))
                }
                requestTwits();
            })
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            {(sessionStorage.getItem("login") == null) && <Navigate replace to="/login"/>}

            <CreateTwitModal createTwitOpen={createTwitOpen.open} handleCreateTwitClose={handleCreateTwitClose} onSubmit={onSubmitTwit} />
            {showTwitOpen.open && <ShowTwitModal handleShowTwitClose={handleShowTwitClose} twitId={showTwitOpen.id} onDeleteTwit={onDeleteTwit} />}

            <Stack direction="row">
                <Map onCreateTwit={handleCreateTwitOpen} onShowTwit={handleShowTwitOpen} twits={twits}/>

                <StackPanel orientation={"vertical"} style={{ marginLeft: 5, width: "20%" }}>
                    <Chip label={ sessionStorage.getItem("login") } style={{ marginBottom: 5 }}/>
                    <Chip label={ "Выйти" } variant={ "outlined" } onClick={ onLogOut } style={{ marginBottom: 5 }}/>

                    <Divider style={{margin: "15px"}}>
                        <Chip label="Поиск Твитов" />
                    </Divider>

                    <form onSubmit={onFindTwits}>
                        <StackPanel orientation={"vertical"}>
                            <TextField placeholder="Поиск" name="text" size="small" style={{}} />
                            <Button type="submit">Найти</Button>
                        </StackPanel>
                    </form>

                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={changeCollapsedListOpen}>
                            <ListItemText primary="Найденные твиты" />
                            {collapsedListOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={collapsedListOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {foundTwits.map((twit) => (
                                    <ListItemButton onClick={() => handleShowTwitOpen(twit.id)}>
                                        <ListItemText primary={twit.author.login} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </StackPanel>
            </Stack>
        </>
    );
}

export default withRouter(MainPage);