import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function TravelMap() {
  const position = {lat: 61.2176, lng: -149.8997};
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer url={""}      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          This is a popup
        </Popup>
      </Marker>
    </MapContainer>
  );
}