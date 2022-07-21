import { useState } from "react"
const HostEditProfile = (props) => {
    const {user}=props
    const [newUser,setNewUser]=useState(user.username)
    const [passwordView,setPasswordView]=useState(false)
    const instruments = ['Razz','Input','Opium','Bling Bling','Wolf','Pacha','Sutton','LaFira']
    const handleToggle=(event)=>{
        event.preventDefault()
        setPasswordView(!passwordView)
    }
    const handlerUsernameInput = (e) => {
        setNewUser(e.target.value);
      };
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
            <input value={newUser} onChange={(e) => handlerUsernameInput(e)} type="text"/>
            <button onClick={(event)=>{
                handleToggle(event)
            }}>Editar Contraseña</button>
            {passwordView &&
            <div className='changePassword-container'>
                <label >Password Anterior</label><input type="password"/>
                <label>Password Nueva</label><input type="password"/>
                <label >Repite Password</label><input type="password"/>{/*escribir funcion para verificar password iguales, sino renderizar un span error*/}

                </div>}
                <button type="submit">Save Changes</button>
        </form>
     );
}
 
 
export default HostEditProfile;