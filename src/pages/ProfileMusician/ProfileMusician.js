import { useState,useContext } from "react";
import './ProfileMusician.css';
import perfilImage from '../../assets/perfil.jpg'
import {AuthContext} from '../../context/auth.context'
import MusicianProfileView from "../../components/MusicianProfileView/MusicianProfileView";
import MusicianEditProfile from "../../components/MusicianEditProfile/MusicianEditProfile";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

const ProfileMusician = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState(false)
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( <section className="profile-section">
        <ProfileInfo/>
        <div  className="profileInfo-container">
        {editView===false? <MusicianProfileView/>: <MusicianEditProfile/>}
        </div>
    </section> );
}
 
export default ProfileMusician;