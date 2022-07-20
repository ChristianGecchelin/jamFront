import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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