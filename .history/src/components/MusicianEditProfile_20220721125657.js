const MusicianEditProfile = () => {
    const instruments = ['Guitar','Drums','Bass','Piano','Singer','Harmonica','Saxophone','Trumpet']
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
            </li>
          );
        })}
      </ul>
        </form>
     );
}
 
export default MusicianEditProfile;