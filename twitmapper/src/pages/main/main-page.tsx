import { useStore } from 'effector-react';
import * as React from 'react';
import { Field, Form, FieldRenderProps } from 'react-final-form';
import { Button, Input, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { StackPanel } from '../../ui';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const StyledMapContainer = styled(MapContainer)`
    height: 80vh;
    width: 80vw;
`;

function LocationMarker() {
    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
    
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
                setPosition({
                    latitude: lat,
                    longitude: lng,
                })
        },
    //     locationfound(e) {
    //         const { lat, lng } = e.latlng;
    //             setPosition({
    //                 latitude: lat,
    //                 longitude: lng,
    //             })
    //         map.flyTo(e.latlng, map.getZoom())
    //    },
    })
   
    return (
        position.latitude !== 0 ? 
            <Marker 
                position={[position.latitude, position.longitude]}
                interactive={true} 
            >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            : null
     )   
     
   }

// function handleClick(e){
//     setState({ currentPos: e.latlng });
// }

export function MainPage() {

    return (
        <StyledMapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <LocationMarker />
        </StyledMapContainer>
    );
}
