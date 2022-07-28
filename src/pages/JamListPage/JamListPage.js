import { List,ListItem,ListItemText, Stack  } from '@mui/material';
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
import ButtonOut from '../../components/ButtonOut/ButtonOut';
import ButtonGoToDetails from '../../components/ButtonGoToDetails/ButtonGoToDetails';
import ButtonIn from '../../components/ButtonIn/ButtonIn';
const API_URL = "http://localhost:5005"; 

function JamListPage() {
    const [jams, setjams] = useState([])
    const [cloneJams,setCloneJams] = useState(jams)
    const { user } = useContext(AuthContext)  
    const [currentUser,setCurrentUser] = useState([])
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
        <Box 
        sx={{ width: '90%',m:2}}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'>
        <Box sx={{ width: '10%'}}>
        <JamFilterByDate searchJams={(e)=>{
            setjams(searchJamsByDate(e,cloneJams))
        }}/>
        </Box>
        <Box sx={{ width: '80%',}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {jams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            secondaryAction={
                <Stack direction="row">
                <ButtonGoToDetails jamId={jam._id}/>
                <ButtonIn jamId={jam._id} user={user}/>
                <ButtonOut jamId={jam._id} user={user}/>
                </Stack>
            }
            >
            <ListItemText primary={`${jam.name}        ${jam.date}`} />
            </ListItem>
            <Divider/>
            </>
            ))}
        </List>
        </Box>
        </Box>
    )
}
export default JamListPage