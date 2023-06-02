import styled from 'styled-components';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { Chip } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { StackPanel } from 'src/ui';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const StyledMapContainer = styled(MapContainer)`
    height: 97vh;
    width: 80vw;
`;

type CreateTwitMarkerProps = {
    onCreateTwit: (lat: number, lon: number) => void,
}

function CreateTwitMarker(props: CreateTwitMarkerProps) {
    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
    
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
                setPosition({
                    latitude: lat,
                    longitude: lng,
                })
        },
    })

    const map = useMap()

    return (
            position.latitude !== 0 ? 
                <Marker 
                    position={[position.latitude, position.longitude]}
                    interactive={true}
                    draggable={false}
                >
                    <Popup>
                        <Chip label="Создать твит" variant="outlined" onClick={ 
                            () => { 
                                props.onCreateTwit(position.latitude, position.longitude);
                                map.closePopup();
                            }
                        }/>
                    </Popup>
                </Marker>
                : null
            )   
     
   }

type Twit = {
    author: {id: number, login: string},
    id: number,
    lat: number,
    lon: number,
}

type TwitMarkersProps = {
    twits: Array<Twit>,
    onClick: (id: number) => void
}

function TwitMarkers(props: TwitMarkersProps){
    const twitMarkers = props.twits.map((twit: Twit) => (
        <Marker position={[twit.lat, twit.lon]}>
            <Popup>
                <StackPanel orientation="vertical">
                    <Chip label={`Твит от ${twit.author.login}`} style = {{ marginBottom: 10 }}/>
                    <Chip label={`Посмотреть`} variant="outlined" onClick={() => props.onClick(twit.id)} />
                </StackPanel>
            </Popup>
        </Marker>
    ))

    return (
        <>
            {twitMarkers}
        </>
    )
}

type MapProps = {
    onCreateTwit: (lat: number, lon: number) => void,
    onShowTwit: (id: number) => void
    twits: Array<Twit>,
}

export function Map(props: MapProps) {
    return (
        <StyledMapContainer center={[55.792132015434056, 49.12211155035047]} zoom={13} scrollWheelZoom={true} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CreateTwitMarker onCreateTwit={props.onCreateTwit} />
            <TwitMarkers twits={props.twits} onClick={props.onShowTwit} />
        </StyledMapContainer>
    );
}
