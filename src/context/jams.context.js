import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const JamContext = React.createContext();

function JamProviderWrapper(props) {
    const [allJams,setAllJams] = useState([])

    function getAllJams(){
        axios
        .get(`${API_URL}/jams`)
        .then((response)=>{
            const jams = response.data
            setAllJams(jams)
        })
    }

    useEffect(()=>{
        getAllJams()
    },[allJams.length])

    return (
<<<<<<< HEAD
		<JamContext.Provider value={{ allJams,getAllJams }}>
=======
		<JamContext.Provider value={{ allJams, setAllJams }}>
>>>>>>> 9ea859fa45d7c82a012987df47d50059ff64ecd1
			{props.children}
		</JamContext.Provider>
	);
}

export { JamProviderWrapper, JamContext };
