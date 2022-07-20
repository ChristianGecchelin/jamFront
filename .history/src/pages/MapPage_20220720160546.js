import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFuZ2VjY2hlbGluIiwiYSI6ImNreXp6MGttcTB6Njgyb212dGQwN2gyNGEifQ.uqF7EL5e27LjY8_pFemOyg'

const MapPage = () => {
    return ( <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      /> );
}
 
export default MapPage;