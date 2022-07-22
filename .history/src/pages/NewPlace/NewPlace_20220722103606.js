import { useState,useContext } from "react";
import {AuthContext} from '../../context/auth.context';

const NewPlace = () => {
    const [ namePlace, setNamePlace ] = useState('');
    const [ long, setLong ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const{user}=useContext(AuthContext)
    console.log(user)
    const handleNamePlaceInput = (e) => setNamePlace(e.target.value);
    const handleLongInput = (e) => setLong(e.target.value);
    const handleLatInput = (e) => setLat(e.target.value); 
    const handlePhotoInput = (e) => setPhoto(e.target.value);

    const handleNewPlaceSubmit = async (e) => {
		e.preventDefault();
		// Create an object representing the request body
		const requestBody = { namePlace, long, lat,photo };
    try{
      await signupService(requestBody);
      navigate("/login");
    }catch(err){
      if(err.response?.status === 400){
        setErrorMessage(err.response.data.errorMessage);
        console.log(errorMessage);
      }
    }
  };
    return ( 
    <div>
        <h2>Agrega un nuevo lugar</h2>
        <form onSubmit={handleNewPlaceSubmit}>
            <label>Nombre</label>
            <input type="text" name="name" value={namePlace} onChange={handleNamePlace}/>
            <label>Long</label>
            <input type="number" name='long' value={long} onChange={handleLong}/>
            <label>Lat</label>
            <input type="number" name='lat' value={lat} onChange={handleLat}/>
            {/* busca en el mapa */}
            <label>Fotos</label>
            <input type="text" name='photo' value={photo} onChange={setPhoto}/>
            <button type='submit'>Crear</button>
        </form>
    </div> 
    );
}
 
export default NewPlace;