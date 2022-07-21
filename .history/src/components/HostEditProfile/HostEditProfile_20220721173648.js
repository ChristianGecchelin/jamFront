import { useState } from "react"
const HostEditProfile = () => {
    const [passwordView,setPasswordView]=useState('false')
    const instruments = ['Guitar','Drums','Bass','Piano','Singer','Harmonica','Saxophone','Trumpet']
    const handleToggle=()=>{
        setPasswordView(!passwordView)
    }
    return ( 
        <form action="">
            <label for="">Acerca de mí</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <label for="">Foto de Perfil</label>
            <input type="text" name="" id=""/>
            <label for="">Añade instrumentos</label>
            <ul className="toppings-list">
                {instruments.map((instrument) => {
                     return (
                        <li key={instrument}>
                        <div className="toppings-list-item">
                        <div className="left-section">
                            <input
                             type="checkbox"
                             id={instrument}
                             name={instrument}
                             value={instrument}
                            />
                            <label htmlFor={instrument}>{instrument}</label>
                         </div>
                        </div>
                         </li> );
                })}
            </ul>
            <label for="">Usuario</label>
            <input type="text"/>
            <button onClick={()=>{
                handleToggle()
            }}></button>
            {passwordView&&
            <div className='changePassword-container'>
                <label for="">Password Anterior</label><input type="password"/>
                <label for="">Password Nueva</label><input type="password"/>
                <label for="">Repite Password</label><input type="password"/>{/*escribir funcion para verificar password iguales, sino renderizar un span error*/}

                </div>}
                <button type="submit">Save Changes</button>
        </form>
     );
}
 
export default HostEditProfile;