import {Map,Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = process.env.REACT_APP_TEST
console.log(MAPBOX_TOKEN)
const MapPage = () => {
    return ( <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14
        }}
        style={{width: '100vw', height: '90vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map> );
}
 
export default MapPage;