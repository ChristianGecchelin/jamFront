import { useContext } from 'react';
import { AuthContext } from "../../context/auth.context";
import './BtnMyLocation.css'

const BtnMyLocation = () => {
    const { map,isMapReady,userLocation } = useContext(AuthContext);
   
    const onClick =()=>{
        if(!isMapReady)throw new Error('Mapa no está listo')
        if(!userLocation)throw new Error('Mapa no está listo')
        map.flyTo({
            zoom:14,
            center:userLocation
        })
    }

  return <>
  
  <button className="location-button" onClick={onClick}>
    Mi ubicación
  </button>
  
  </>;
};

export default BtnMyLocation;
