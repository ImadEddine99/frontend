import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';
import { renderToString } from 'react-dom/server';
export default function MapView({ routeCoords, stopsCoords }) {
  const markerHtmlStyles = `
  background-color: red;
  width: 1rem;
  height: 3rem;
  display: block;
  left: -1rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF;
`;
  const redRoomIconHTML = renderToString(
    <RoomIcon style={{ color: 'red', fontSize: '84px' }} />
  );
  
  // Create a Leaflet divIcon
  const redRoomIcon = L.divIcon({
    html: redRoomIconHTML,
    iconSize:[12, 36],
    className: markerHtmlStyles, // avoid overriding Material UI styles
    iconAnchor: [12, 36], // adjust to visually center
  });

  if (!routeCoords || routeCoords.length === 0) return null;

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Trip Route</h1>
      <div style={{ height: "500px", width: "100%", marginTop: "40px" }}>
        <MapContainer
          center={routeCoords[0]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Draw the route as a blue line */}
          <Polyline positions={routeCoords} color="blue" />

          {/* Start/End markers from routeCoords */}
          <Marker position={routeCoords[0]}>
            {/* <Popup>Start</Popup> */}
          </Marker>
          <Marker position={routeCoords[routeCoords.length - 1]}>
            {/* <Popup>End</Popup> */}
          </Marker>

          {/* Fuel stops or intermediate points */}
          {stopsCoords && stopsCoords.map((pos, idx) => (
<Marker key={idx} position={pos.location} >
    <Popup>
      <strong>{pos.name}</strong><br />
      {pos.address}<br />
      <em>${pos.price.toFixed(2)}</em>
    </Popup>
  </Marker>
))}
        </MapContainer>
      </div>
    </>
  );
}
