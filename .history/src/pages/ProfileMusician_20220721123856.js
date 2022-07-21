import { useState,useContext } from "react";
import {AuthContext} from '../context/auth.context'
const ProfileMusician = () => {
    const{user}=useContext(AuthContext)
    const[editView,setEditView]=useState('false')
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( <section>
        <div className="personalInfo-container">
            <img src="" alt=""/>
            <h2>Bienvenido {user.name}</h2>
            <h3>Mis instrumentos</h3>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div className="variableProfile-container">
            <div className="row-cards-container">
                <h3>Mis proximos eventos</h3>
                <div>
                    <img src="" alt=""/><img src="" alt=""/><img src="" alt=""/><img src="" alt=""/>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    </section> );
}
 
export default ProfileMusician;