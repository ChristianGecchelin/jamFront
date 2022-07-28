import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const NewPlace = () => {
  const [namePlace, setNamePlace] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [photo, setPhoto] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const handleNamePlaceInput = (e) => setNamePlace(e.target.value);
  const handleLongInput = (e) => setLong(e.target.value);
  const handleLatInput = (e) => setLat(e.target.value);
  const handlePhotoInput = (e) => setPhoto(e.target.value);
  const handleAddressInput = (e) => setAddress(e.target.value);
  const handleNewPlaceSubmit = async (e) => {
    e.preventDefault();
    const coordinates = [lat, long];
    // Create an object representing the request body
    const requestBody = {
      name: namePlace,
      coordinates,
      photo,
      userId,
      address,
    };
    try {
      await axios.post(`${API_URL}/places`, requestBody).then((response) => {
        // Reset the state
        setNamePlace("");
        setLong("");
        setLat("");
        setPhoto("");
        setAddress("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  /* try{
      await signupService(requestBody);
      navigate("/login");
    }catch(err){
      if(err.response?.status === 400){
        setErrorMessage(err.response.data.errorMessage);
        console.log(errorMessage);
      }
    } */

  return (
    <div>
      <h2>Agrega un nuevo lugar</h2>
      <form onSubmit={(e) => handleNewPlaceSubmit(e)}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={namePlace}
          onChange={(e) => handleNamePlaceInput(e)}
        />
        <label>Long</label>
        <input
          type="number"
          name="long"
          value={long}
          onChange={(e) => handleLongInput(e)}
        />
        <label>Lat</label>
        <input
          type="number"
          name="lat"
          value={lat}
          onChange={(e) => handleLatInput(e)}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => handleAddressInput(e)}
        />
        {/* busca en el mapa */}
        <label>Fotos</label>
        <input
          type="text"
          name="photo"
          value={photo}
          onChange={(e) => handlePhotoInput(e)}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default NewPlace;
