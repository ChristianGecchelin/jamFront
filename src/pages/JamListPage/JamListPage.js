import { List,ListItem,ListItemText  } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useContext } from "react";                       // <== IMPORT 
import { AuthContext } from "../../context/auth.context"; 
import JamFilterByDate from '../../components/JamFilters/JamFilterByDate';
import SimplePopper from '../../components/Popper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { JamContext } from '../../context/jams.context';
import { searchJamsByDate } from '../../services/jams.services';
const API_URL = "http://localhost:5005"; 

function JamListPage() {
    const [jams, setjams] = useState([])
    const [cloneJams,setCloneJams] = useState(jams)
    const { user } = useContext(AuthContext)  
    const {allJams, setAllJams} = useContext(JamContext)  
    
    useEffect(()=>{
        setjams(allJams)
        setCloneJams(allJams)
        
    },[allJams])

    useEffect(()=>{
        axios.get(`${API_URL}/api/jams`)
        .then((allJams)=>{
            setjams(allJams.data)
        })
        .catch(err=>console.log(err))
    },[])

    return (
        <Box>
        <JamFilterByDate searchJams={(e)=>{
            setjams(searchJamsByDate(e,cloneJams))
        }}/>
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