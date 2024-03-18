import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerHighlight from "../assets/loc-marker.png";
import { Icon } from 'leaflet';
import { Select, MenuItem } from '@mui/material';
import strongSignalIcon from "../assets/loc-marker-strong.png";
import normalSignalIcon from "../assets/loc-marker-normal.png";
import weakSignalIcon from "../assets/loc-marker-weak.png";
import Typography from '@mui/material/Typography';

function Heatmap() {
    const DEFAULT = [37.8715, -122.2595];
    const coords = {
        "Sather Gate": [37.8703, -122.2595],
        "ASUC Student Union": [37.8692, -122.2597],
        "Moffitt Library": [37.8725, -122.2608],
        "Doe Library": [37.8722, -122.2592],
        "East Asian Library": [37.8736, -122.2600],
        "Kresge Engineering Library": [37.8738, -122.2583],
        "Haas Courtyard": [37.8716, -122.2533],
    };

    const [selectedLocation, setSelectedLocation] = useState("Moffitt Library");

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const [selectedSignal, setSelectedSignal] = useState("Normal");

    const handleSignalChange = (event) => {
        setSelectedSignal(event.target.value);
    }

    function BerkeleyMap() {
        return (
            <MapContainer center={DEFAULT} zoom={17} style={{ height: '700px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <BerkeleyMarker pos={coords[selectedLocation]} desc={selectedLocation} signal={selectedSignal} />
            </MapContainer>
        );
    };

    function BerkeleyMarker(props) {
        let signalIcon;
        switch(props.signal) {
            case 'Strong':
                signalIcon = strongSignalIcon;
                break;
            case 'Normal':
                signalIcon = normalSignalIcon;
                break;
            case 'Weak':
                signalIcon = weakSignalIcon;
                break;
            default:
                signalIcon = markerHighlight;
        }

        return (
            <Marker position={props.pos} icon={
                new Icon({
                    iconUrl: signalIcon,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }>
                <Popup>
                    {props.desc}
                </Popup>
            </Marker>
        );
    };

    return (
        <div>
            <BerkeleyMap />

            <Typography variant="body1" gutterBottom>Select your location</Typography>
            <Select value={selectedLocation} onChange={handleLocationChange} style={{ marginBottom: '10px' }}>
                {Object.keys(coords).map((location, index) => (
                    <MenuItem key={index} label='Location' value={location}>{location}</MenuItem>
                ))}
            </Select>

            <Typography variant="body1" gutterBottom>Select the signal strength</Typography>
            <Select value={selectedSignal} label='Strength' onChange={handleSignalChange} style={{ marginBottom: '20px' }}>
                <MenuItem value="Strong">Strong</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Weak">Weak</MenuItem>
            </Select>
            
        </div>
    );
}

export default Heatmap;
