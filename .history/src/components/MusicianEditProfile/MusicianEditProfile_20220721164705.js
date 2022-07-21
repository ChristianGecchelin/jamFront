import './MusicianEditProfile.css'

import { useState } from "react"
const MusicianEditProfile = () => {
    const [passwordView,setPasswordView]=useState('false')
    const instruments = ['Guitar','Drums','Bass','Piano','Singer','Harmonica','Saxophone','Trumpet']
    const handleToggle=(event)=>{
        event.preventDefault()
        setPasswordView(!passwordView)
    }
    return ( 
        <form action="">
            <label >Acerca de mí</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <label >Foto de Perfil</label>
            <input type="text" name="" id=""/>
            <label >Añade instrumentos</label>
            <ul className="instrument-list">
                {instruments.map((instrument) => {
                     return (
                        <li key={instrument}>
                        <div className="instrument-list-item">
                        <label htmlFor={instrument}>{instrument}</label>
                            <input
                             type="checkbox"
                             id={instrument}
                             name={instrument}
                             value={instrument}
                            />
                            
                       
                        </div>
                         </li> );
                })}
            </ul>
            <label >Usuario</label>
            <input type="text"/>
            <button onClick={(event)=>{
                handleToggle(event)
            }}>Editar Contraseña</button>
            {!passwordView &&
            <div>
                <label >Password Anterior</label><input type="password"/>
                <label>Password Nueva</label><input type="password"/>
                <label >Repite Password</label><input type="password"/>{/*escribir funcion para verificar password iguales, sino renderizar un span error*/}

                </div>}
                <button type="submit">Save Changes</button>
        </form>
     );
}
 
export default MusicianEditProfile;