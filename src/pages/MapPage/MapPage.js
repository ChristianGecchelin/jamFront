import React, { useRef, useEffect, useState,useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import mapboxgl,{Map,Marker,Popup} from "mapbox-gl";
import BtnMyLocation from "../../components/BtnMyLocation/BtnMyLocation";
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'

import "./MapPage.css";
import pin from "../../assets/pin.png";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken=MAPBOX_TOKEN
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
  const { isLoadingLocation,userLocation,setMap,setIsMapReady } = useContext(AuthContext);
  
  const mapDiv = useRef(null)

  useLayoutEffect(()=>{
    if(!isLoadingLocation){
      const map=new Map({
        container:mapDiv.current ,
        style:'mapbox://styles/mapbox/dark-v10',
        center:userLocation,
        zoom:14
      })
      setMap(map)
      setIsMapReady(true)
      const myLocationPopup=new Popup()
      .setHTML(`<h4>Aqui hola</h4><p>En algun lugar del mundo</p>`)
      new Marker()
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)
      
    }
  },[isLoadingLocation])
  if(isLoadingLocation){
    return(<Loading/>)
  }
  return (
    <div className="mapa-container" ref={mapDiv}>
     <BtnMyLocation/>
     <SearchBar/>
    </div>
  );
};

export default MapPage;
