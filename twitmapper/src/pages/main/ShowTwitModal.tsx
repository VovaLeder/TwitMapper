import { 
    Modal,
    Box, 
    Typography, 
    CircularProgress, 
    List, 
    ListSubheader, 
    ListItem, 
    ListItemText, 
    TextField,
    Button,
    IconButton,
    Divider,
    Chip
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { StackPanel } from 'src/ui';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TwitData } from 'src/models';

const BoxModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ShowTwitModalProps = {
    twitId: number;
    handleShowTwitClose: () => void;
    onDeleteTwit: (id: number) => void;
}

const blankTwit: TwitData = {id: 0, lat: 0, lon: 0, text: "", author: {id: 0, login: "", text: ""}, comments: []}

export function ShowTwitModal(props: ShowTwitModalProps){
    const [twit, setTwit] = useState<TwitData>(blankTwit);

    function loadTwit(){
        axios.get(`http://127.0.0.1:8080/twit?id=${props.twitId}`)
            .then(response => {
                console.log(response.data.data)
                setTwit(response.data.data);
            })
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadTwit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onCreateComment(event: any) {
        event.preventDefault();
        setTwit(blankTwit);

        const req = {
            text: event.target.text.value,
            twitId: props.twitId
        }
    
        event.target.text.value = ""
        axios.post(`http://127.0.0.1:8080/create-comment`, req)
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                loadTwit()
            });
    }

    function onDeleteComment(id: number) {
        setTwit(blankTwit);

        axios.delete(`http://127.0.0.1:8080/delete-comment?id=${id}`)
            .catch(err => {
                console.error(err.response.data.error.description);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                loadTwit()
            });;
    }

    return (
        <Modal
            open={true}
            onClose={props.handleShowTwitClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            
            <Box sx={BoxModalStyle}>
                {twit.author.login !== "" && (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Просмотр Твита от <i>{twit.author.login}</i>
                            {twit.author.login === sessionStorage.getItem('login') &&
                                <IconButton edge="end" onClick={() => props.onDeleteTwit(twit.id)}>
                                    <Delete />
                                </IconButton>
                            }
                        </Typography>
                        <Typography>
                            {twit.text}
                        </Typography>
                        <Divider style={{margin: "15px"}}>
                            <Chip label="Комментарии" />
                        </Divider>
                        <form onSubmit={onCreateComment}>
                            <StackPanel orientation={"vertical"}>
                                <TextField placeholder="Комментарий" name="text" multiline size="small" maxRows={2} />
                                <Button type="submit">Оставить комментарий</Button>
                            </StackPanel>
                        </form>
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >
                            {twit.comments.map((comment) => (
                                <ListItem
                                    secondaryAction={
                                        <>
                                            {comment.author.login === sessionStorage.getItem('login') &&
                                                <IconButton edge="end" onClick={() => onDeleteComment(comment.id)}>
                                                    <Delete />
                                                </IconButton>
                                            }
                                        </>
                                    }
                                >
                                    <ListItemText 
                                        primary={comment.author.login} 
                                        secondary={
                                            <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '21rem'}}> 
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="grey"
                                                    style={{ wordWrap: "break-word" }}
                                                >
                                                    {comment.text} 
                                                </Typography>
                                            </div>
                                        } />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                {twit.author.login === "" && (
                    <CircularProgress />
                )}
            </Box>
        </Modal>
    )
}