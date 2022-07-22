import { useState,useContext } from "react";

const NewPlace = () => {
    const [ email, setEmail ] = useState('');
    const handleEmail = (e) => setEmail(e.target.value);
    const handleSignupSubmit = async (e) => {
		e.preventDefault();
		// Create an object representing the request body
		const requestBody = { name, password, username,type };
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
        <form action="">
            <label>Nombre</label>
            <input type="text" name="name" value={name} onChange={handleName}/>
            <label>Long</label>
            <input type="number"/>
            <label>Lat</label>
            <input type="number"/>
            {/* busca en el mapa */}
            <label>Fotos</label>
            <input type="text"/>
            <button type='submit'>Crear</button>
        </form>
    </div> 
    );
}
 
export default NewPlace;