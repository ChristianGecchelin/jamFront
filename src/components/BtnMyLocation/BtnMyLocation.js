import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../context/auth.context";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./BtnMyLocation.css";

const BtnMyLocation = () => {
  const { map, isMapReady, userLocation } = useContext(AuthContext);

  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no está listo");
    if (!userLocation) throw new Error("Mapa no está listo");
    map.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <>
      <IconButton color="secondary" aria-label="add an alarm" onClick={onClick}className="location-button">
        <MyLocationIcon />
      </IconButton>
    </>
  );
};

export default BtnMyLocation;
