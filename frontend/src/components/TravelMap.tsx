import React, { useState } from "react";
import { AdvancedMarker, Map, MapMouseEvent, Marker} from "@vis.gl/react-google-maps";
import axios from 'axios';
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

  const handleMapClick = (event: MapMouseEvent) => {
    const lat = event.detail.latLng?.lat as number;
    const lng = event.detail.latLng?.lng as number;
    setMarkerLocation({ lat, lng });
  };
  const calculateRoute = async () => {
    const apiKey = "AIzaSyBlF7YCQMhpBMZyPjGIntok5Ksw-zrVg44";
    const directionsUrl = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${apiKey}`;
    const startLocation = { latitude: 45.6980, longitude: 9.6700 }; // Coordinates for Bergamo
    const endLocation = { latitude: 45.4642, longitude: 9.1900 }; // Coordinates for Milan
    const requestBody = {
      origin: { 
        location: { 
          latLng: startLocation 
        }
      },
      destination: { 
        location: { 
          latLng: endLocation 
        }
      },
      travelMode: "DRIVE", 
      routingPreference: "TRAFFIC_AWARE", 
    };
    try {
      const response = await axios.post(directionsUrl, requestBody,{
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline' // Include the required FieldMask
        },
      });

      const data = response.data;

      if (data.routes.length > 0) {
        const route = data.routes[0];
        const distance = route.distanceMeters / 1000 ;
        setRouteDistance(distance);
      } else {
        setRouteCoordinates(null);
      }
    } catch (error) {
      console.error('Errore nel calcolo del percorso:', error);
      setRouteCoordinates(null);
    }
  };

  return (
    <div className="map-container" style={{height: "320px", width: "90%"}}>
        <div style={{display: 'flex', justifyContent: "space-between"}}>
        <Autocomplete
          disablePortal
          options={[]}
          sx={{ width: 250, margin: '10px' }}
          renderInput={(params) => <TextField {...params} label="Partenza" />}
        />
        <Autocomplete
            disablePortal
            options={[]}
            sx={{ width: 250, margin: '10px' }}
            renderInput={(params) => <TextField {...params} label="Destinazione" />}
          />
        </div>
        <div style={{ margin: '10px',  display: 'flex', justifyContent: "space-between"}}>
          <label>
            Andata/Ritorno:
            <Switch checked={roundTrip} onChange={toggleRoundTrip} onMouseOver={calculateRoute}/>
          </label>
          <Typography style={{margin: "10px"}}> Distanza: {roundTrip? routeDistance! * 2: routeDistance} km</Typography>
        </div>
      <Map
        defaultZoom={9}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
        onClick={handleMapClick}
      >
        <AdvancedMarker position={markerLocation}/>
      </Map>
    </div>
  );
}

export default TravelMap;