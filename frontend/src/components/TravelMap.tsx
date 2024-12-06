import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Autocomplete, Button, Switch, TextField, Typography } from "@mui/material";

interface Coordinates {
  lat: number;
  lng: number;
}


const TravelMap: React.FC = () => {
  const [startLocation, setStartLocation] = useState('Bergamo, BG, Italia');
  const [endLocation, setEndLocation] = useState('Milano, MI, Italia');
  const [roundTrip, setRoundTrip] = useState(true);
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState<{ start: Coordinates; end: Coordinates } | null>(null);
  const [markerLocation, setMarkerLocation] = useState<Coordinates>({
    lat: 45.5,
    lng: 9.5,
  });
  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartLocation(event.target.value);
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndLocation(event.target.value);
  };

  const toggleRoundTrip = () => {
    setRoundTrip(!roundTrip);
  };

  const handleMapClick = (event: any) => {
    const lat = event.detail.latLng?.lat as number;
    const lng = event.detail.latLng?.lng as number;
    setMarkerLocation({ lat, lng });
  };
  const calculateRoute = async () => {
  };

return (
    <div className="map-container" style={{height: "320px", width: "90%"}}>
        <div style={{display: 'flex', justifyContent: "space-between"}}>
        <Autocomplete
          disablePortal
          options={[]}
          sx={{ width: 250, margin: '5px' }}
          renderInput={(params) => <TextField {...params} label="Partenza" />}
        />
        <Autocomplete
            disablePortal
            options={[]}
            sx={{ width: 250, margin: '5px' }}
            renderInput={(params) => <TextField {...params} label="Destinazione" />}
          />
        </div>
        <div style={{ margin: '5px',  display: 'flex', justifyContent: "space-between"}}>
          <label>
            Andata/Ritorno:
            <Switch checked={roundTrip} onChange={toggleRoundTrip} onMouseOver={calculateRoute}/>
          </label>
          <Typography style={{margin: "5px"}}> Distanza: {roundTrip? routeDistance! * 2: routeDistance} km</Typography>
        </div>
        <MapContainer center={markerLocation} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' attribution="© OpenStreetMap contributors" />
        </MapContainer>
    </div>
);
}

export default TravelMap;