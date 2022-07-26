import axios from 'axios'
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const searchApi = axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit:5,
        language:'es',
        access_token: MAPBOX_TOKEN
    }
})
export default searchApi