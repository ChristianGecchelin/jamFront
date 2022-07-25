import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "./MapPage.css";
import pin from "../../assets/pin.png";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const data = [
  {
    location: "Manhattan Ave & Norman Ave at NE corner",
    city: "Brooklyn",
    state: "New York",
    coordinates: [-73.9516030004786, 40.72557300071668],
  },
  {
    location: "6th Ave & 42nd St at NW corner",
    city: "Manhattan",
    state: "New York",
    coordinates: [-73.98393399979334, 40.75533300052329],
  },
  {
    location: "Essex St & Delancey St at SE corner",
    city: "Manhattan",
    state: "New York",
    coordinates: [-73.9882730001973, 40.718207001246554],
  },
];

const MapPage = () => {
  const [viewState, setViewState] = useState({
    longitude: 2.6487185,
    latitude: 41.7600566,
    zoom: 3.5,
  });

  return (
    <div className="mapa-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-100} latitude={40} anchor="bottom">
          <img src={pin} width="50px" />
        </Marker>
      </Map>
    </div>
  );
};

export default MapPage;
