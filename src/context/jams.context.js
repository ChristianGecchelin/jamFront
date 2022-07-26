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
        console.log(allJams)
    },[allJams.length])

    return (
		<JamContext.Provider value={{ allJams }}>
			{props.children}
		</JamContext.Provider>
	);
}

export { JamProviderWrapper, JamContext };