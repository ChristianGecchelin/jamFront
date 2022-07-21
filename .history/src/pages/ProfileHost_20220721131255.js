import { useState,useContext } from "react";
import {AuthContext} from '../context/auth.context'
import HostProfileView from "../components/HostProfileView";
import HostEditProfile from "../components/HostEditProfile";
const ProfileHost = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState('false')
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( 
        <section>
        <div className="personalInfo-container">
            <img src="" alt=""/>
            <h2>Bienvenido {user.name}</h2>
            <h3>Mis instrumentos</h3>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div >
        {editView==='false'? <HostProfileView/>: <HostEditProfile/>}
        </div>
    </section> );
}
 
export default ProfileHost;