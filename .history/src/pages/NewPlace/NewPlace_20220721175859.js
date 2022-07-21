const NewPlace = () => {
    return ( 
    <div>
        <h2>Agrega un nuevo lugar</h2>
        <form action="">
            <label>Nombre</label>
            <input type="text"/>
            {/* busca en el mapa */}
            <label>Fotos</label>
            <input type="text"/>
            <button>Crear</button>
        </form>
    </div> 
    );
}
 
export default NewPlace;