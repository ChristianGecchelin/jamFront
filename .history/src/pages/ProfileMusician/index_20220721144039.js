import { useState,useContext } from "react";
import './ProfileMusician.css'
import {AuthContext} from '../../context/auth.context'
import MusicianProfileView from "../../components/MusicianProfileView";
import MusicianEditProfile from "../../components/MusicianEditProfile";
const ProfileMusician = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState('false')
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( <section className="profile-section">
        <div className="personalInfo-container">
            <img src="" alt=""/>
            <h2>Bienvenido {user.name}</h2>
            <h3>Mis instrumentos</h3>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div >
        {editView==='false'? <MusicianProfileView/>: <MusicianEditProfile/>}
        </div>
    </section> );
}
 
export default ProfileMusician;