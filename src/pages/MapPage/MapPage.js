import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { JamContext } from "../../context/jams.context";
import BtnMyLocation from "../../components/BtnMyLocation/BtnMyLocation";
import Loading from "../../components/Loading/Loading";
import SearchBar from "../../components/SearchBar/SearchBar";
import JamFilterByDate from "../../components/JamFilters/JamFilterByDate";
import Button from "@mui/material/Button";

import "./MapPage.css";
import pin from "../../assets/pin.png";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapPage = () => {
  const { allJams } = useContext(JamContext);
  const { user, isLoadingLocation, userLocation, setMap, setIsMapReady, map } =
    useContext(AuthContext);
  const [markers, setMarkers] = useState([]);
  const mapDiv = useRef(null);
  const [jams, setjams] = useState([]);
  const [cloneJams, setCloneJams] = useState(jams);

  const searchJamsByDate = (date) => {
    //Convert the date without the hours
    let convertedDate = date.setHours(0, 0, 0, 0);
    const updatedJams = cloneJams.filter((cloneJam) => {
      if (convertedDate === null) {
        return cloneJam;
      } else {
        //Convert the date into a date object, without the hours
        let convertedJamDate = new Date(cloneJam.date).setHours(0, 0, 0, 0);
        return convertedJamDate === convertedDate;
      }
    });
    setjams(updatedJams);
  };

  const deleteFilters=()=>{
    setjams(allJams)
  }
  const createMarkersJams = (array) => {
    markers.forEach((marker) => marker.remove());
    const newMarkers = [];
    setMarkers(newMarkers);
    console.log(markers);
    for (const jam of array) {
      if (typeof jam.location.center !== undefined) {
        const [lng, lat] = jam.location.center;
        const myLocationPopup = new Popup().setHTML(
          `<h4>${jam.name}</h4>
          <p>${jam.host.username}</p>
          <p>${jam.date}</p>
          <p>${jam.location.label}</p>
          <a href="${`/jams/${jam._id}`}"> Details </button>
        `
        );
        const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(myLocationPopup)
          .addTo(map);
        newMarkers.push(newMarker);
      }
    }
  };

  useLayoutEffect(() => {
    if (!isLoadingLocation) {
      const map = new Map({
        container: mapDiv.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: userLocation,
        zoom: 14,
      });
      setMap(map);
      setIsMapReady(true);
      const myLocationPopup = new Popup().setHTML(
        `<h4>Aqui hola</h4><p>En algun lugar del mundo</p>`
      );
      new Marker()
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);
    }
  }, [isLoadingLocation]);

  useEffect(() => {
    setjams(allJams);
    setCloneJams(allJams);
    createMarkersJams(allJams);
    console.log(jams);
  }, [allJams]);
  useEffect(() => {
    createMarkersJams(jams);
  }, [jams]);
  if (isLoadingLocation) {
    return <Loading />;
  }
  return (
    <div className="mapa-container" ref={mapDiv}>
      <BtnMyLocation />
      <JamFilterByDate
        style={{ zIndex: 500, width: "500px", backgroundColor: "white," }}
        searchJams={searchJamsByDate}
        className="MuiFormControl-root"
      /> 
      {/*    <SearchBar
        style={{
          position: "fixed",
          top: 150,
          zIndex: 950,
          width: "300px",
        }}
      />*/}
      <Button style={{ cursor:'pointer',zIndex: 500, width: "500px", backgroundColor: "white," }} onClick={deleteFilters} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Borrar filtros
      </Button>
    </div>
  );
};

export default MapPage;
