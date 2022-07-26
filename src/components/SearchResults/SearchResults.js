import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import './SearchResults.css'
const SearchResults = () => {
  const { places, isLoadingPlaces,map } = useContext(AuthContext);

    const onPlaceClicked=(place)=>{
        map.flyTo({
            zoom:14,
            center:place.center
        })
    }





  if (isLoadingPlaces) {
    return (
      <div>
        <ul>
          <li>
            <h6>Buscando</h6>
            <p>Espere por favor.....................</p>
          </li>
        </ul>
      </div>
    );
  }
  if (places.length === 0) {
    return <></>;
  }
  return (
    <ul>
      {places.map((place) => {
        return (
          <li key={place.id} className='pointer' onClick={()=>onPlaceClicked(place)}>
            <h6>{place.text_es}</h6>
            <p>{place.place_name}</p>
            <button>Direccion</button>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
