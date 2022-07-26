import React, { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import { getUserLocation } from "../helpers";
import searchApi from "../apis/searchApi";

const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [userLocation, setUserLocation] = useState(undefined);
  const [isMapReady, setIsMapReady] = useState(false);
  const [map, setMap] = useState(undefined);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  // const [ error, setError ] = useState();

  const verifyStoredToken = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const user = response.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      // If the token is not available
      setIsLoading(false);
    }
  };

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();

    /* 
	After saving the token in the localStorage we call the
	function `verifyStoredToken` which sends a new request to the
	server to verify the token. Upon receiving the response the function 
	`verifyStoredToken` updates the state variables `isLoggedIn`, `user` and `isLoading`
    */
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");

    // Update the state variables
    setIsLoggedIn(false);
    setUser(null);
  };

  const searchPlacesByTerm = async (query) => {
    if (query.length === 0) {
      return setPlaces([]);
    }
    if (!userLocation) throw new Error("No hay ubicacion del usuario");

    setIsLoadingPlaces(true);

    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: userLocation.join(","),
      },
    });
    setIsLoadingPlaces(false);
    setPlaces(resp.data.features);
    return resp.data;
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  useEffect(() => {
    getUserLocation().then((lngLat) => {
      setUserLocation(lngLat);
      setIsLoadingLocation(false);
    });
  }, []);

  useEffect(() => {
    markers.forEach((marker) => marker.remove());
    const newMarkers = [];
    setMarkers(newMarkers)
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_es}</h6><p>${place.place_name_es}</p>`
      );
      const newMarker = new Marker()
      .setPopup(popup)
      .setLngLat([ lng,lat])
      .addTo(map)
      newMarkers.push(newMarker)
    }
  }, [places]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logInUser,
        logOutUser,
        isLoadingLocation,
        userLocation,
        isMapReady,
        setIsMapReady,
        map,
        setMap,
        searchPlacesByTerm,
        isLoadingPlaces,
        places,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
