import { useState,useContext } from "react";
import './ProfileMusician.css';
import perfilImage from '../../assets/perfil.jpg'
import {AuthContext} from '../../context/auth.context'
import MusicianProfileView from "../../components/MusicianProfileView/MusicianProfileView";
import MusicianEditProfile from "../../components/MusicianEditProfile/MusicianEditProfile";
const ProfileMusician = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState(false)
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( <section className="profile-section">
        <div className="personalInfo-container">
            <img src={perfilImage} alt="perfilImage"/>
            <h2>Bienvenido {user.name}</h2>
            <h3>Mis instrumentos</h3>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div  className="profileInfo-container">
        {editView===false? <MusicianProfileView/>: <MusicianEditProfile/>}
        </div>
    </section> );
}
 
export default ProfileMusician;