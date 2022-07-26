import React, { useRef, useEffect, useState,useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { JamContext } from "../../context/jams.context";
import mapboxgl,{Map,Marker,Popup} from "mapbox-gl";
import BtnMyLocation from "../../components/BtnMyLocation/BtnMyLocation";
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'

import "./MapPage.css";
import pin from "../../assets/pin.png";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken=MAPBOX_TOKEN

const MapPage = () => {
  const {allJams}=useContext(JamContext)
  console.log(allJams)
  const { isLoadingLocation,userLocation,setMap,setIsMapReady } = useContext(AuthContext);
  const [markers,setMarkers]=useState([])
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
     <SearchBar 
        style={{
          position:'fixed',
          top:150,
          zIndex: 950,
        width:'300px' }
        }/>
    </div>
  );
};

export default MapPage;
