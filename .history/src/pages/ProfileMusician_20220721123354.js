import { useState } from "react";
const ProfileMusician = () => {
    const[editView,setEditView]=useState('false')
    const handleToggle=()=>{
         setEditView(!editView)
    }
    return ( <section>
        <div className="info-container">
            <img src="" alt=""/>
            <h3>Mis instrumentos</h3>
            <p>Mi rating:</p>{/*o places*/}
            <button onClick={()=>{handleToggle()}}>Editar</button> {/*setear toggle*/}
        </div>
        <div className="profile-form">

        </div>
    </section> );
}
 
export default ProfileMusician;