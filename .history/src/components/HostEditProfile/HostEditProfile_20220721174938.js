import { useState } from "react"
const HostEditProfile = (props) => {
    const {user}=props
    const [newUser,setNewUser]=useState(user.username)
    const [passwordView,setPasswordView]=useState(false)
    const discos = ['Razz','Input','Opium','Bling Bling','Wolf','Pacha','Sutton','LaFira']
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
            <label >Lista de places</label>
            <ul className="instrument-list">
                {discos.map((disco) => {
                     return (
                        <li key={disco}>
                        <p className="list-places">{disco}</p>
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