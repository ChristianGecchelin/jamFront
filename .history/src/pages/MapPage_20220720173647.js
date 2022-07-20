import React, { useRef, useEffect, useState } from 'react';
/* import {Map,Marker} from 'react-map-gl'; */
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN


const MapPage = () => {
    const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    });
    return ( <div>
        <div ref={mapContainer} className="map-container" />
        </div>/* <Map
        
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14
        }}
        style={{width: '100vw', height: '90vh'}}
        reuseMaps
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map> ); */)
}
 
export default MapPage;