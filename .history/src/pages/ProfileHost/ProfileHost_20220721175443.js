import { useState,useContext } from "react";
import {Link}from 'react-router-dom'
import './ProfileHost.css';
import profileImage from '../../assets/perfil.jpg'
import {AuthContext} from '../../context/auth.context';
import HostProfileView from "../../components/HostProfileView/HostProfileView";
import HostEditProfile from "../../components/HostEditProfile/HostEditProfile";
const ProfileHost = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState(false)
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( 
        <section className="profile-section">
        <div className="personalInfo-container">
            <img src={profileImage} alt=""/>
            <h2>Bienvenido {user.name}</h2>
            <Link>Agrega tu place</Link>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div className="profileInfo-container">
        {editView===false? <HostProfileView />: <HostEditProfile user={user}/>}
        </div>
    </section> );
}
 
export default ProfileHost;