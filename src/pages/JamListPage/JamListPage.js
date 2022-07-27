import { List,ListItem,ListItemText  } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useContext } from "react";                       // <== IMPORT 
import { AuthContext } from "../../context/auth.context"; 
import JamFilterByDate from '../../components/JamFilters/JamFilterByDate';
import JamFilterByCategory from '../../components/JamFilters/JamFileterByCategory';
import SimplePopper from '../../components/Popper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { JamContext } from '../../context/jams.context';
const API_URL = "http://localhost:5005"; 

function JamListPage() {
    const [jams, setjams] = useState([])
    const [cloneJams,setCloneJams] = useState(jams)
    const { user } = useContext(AuthContext)  
    const {allJams} = useContext(JamContext)  
    
    const searchJamsByDate = (date) => {
        //Convert the date without the hours
        let convertedDate = date.setHours(0,0,0,0)
        const updatedJams = cloneJams.filter((cloneJam)=>{
            if(convertedDate===null){
                return cloneJam
            }else{
                //Convert the date into a date object, without the hours
                let convertedJamDate = new Date(cloneJam.date).setHours(0,0,0,0)
                return convertedJamDate === convertedDate
            }
        })
        setjams(updatedJams)
    }

    /*useEffect(()=>{
        axios
        .get(`${API_URL}/api/jams`)
        .then((allJams) => 
        {setjams(allJams.data)
        setCloneJams(allJams.data)})
        .catch(err=>console.log(err))
    },[])*/

    useEffect(()=>{
        console.log(allJams)
        setjams(allJams)
        setCloneJams(allJams)
    },[allJams])

    return (
        <Box>
        <JamFilterByDate searchJams={searchJamsByDate}/>
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {jams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            secondaryAction={
                <SimplePopper jam={jam}/>
            }
            >
            <ListItemText primary={`${jam.name}        ${jam.date}`} />
            {jam.host &&
                <ListItemText primary={`${jam.host.username}`} />
            }
            </ListItem>
            <Divider/>
            </>
            ))}
        </List>
        </Box>
    )
}
export default JamListPage