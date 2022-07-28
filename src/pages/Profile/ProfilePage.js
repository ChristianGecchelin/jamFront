import axios from "axios";

import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileJamList from "../../components/ProfileInfo/ProfileJamList";

//React
import { useState,useContext, useEffect } from "react";
import {AuthContext} from '../../context/auth.context'
import { JamContext } from "../../context/jams.context";

//Material UI
import { Box } from "@mui/material";


function ProfilePage ()  {
    const{user}=useContext(AuthContext)
    const {allJams, setAllJams} = useContext(JamContext)  
    const [currentUser,setCurrentUser] = useState([])
    const [createdJams,setCreatedJams] = useState([])
    const [registeredJams,setRegisteredJams] = useState([])

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user._id}`)
        .then((foundUser)=>{
            const user = foundUser.data
            setCurrentUser(user)
            setCreatedJams(user.jamsCreated)
            setRegisteredJams(user.eventsSubscribed)
        })
        .then((response)=>{
            
        })
        .catch(err => console.log(err))
    },[])

    return(
        <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='space-evenly'
        sx={{ width: '100%', bgcolor: 'background.paper', m:4}}
        >
        <ProfileInfo user={currentUser}/>
        <ProfileJamList 
        createdJams = {createdJams} setCreatedJams = {setCreatedJams} 
        registeredJams = {registeredJams} setRegisteredJams = {setRegisteredJams}
        />

        </Box>
    )
}

export default ProfilePage