import { List,ListItem,ListItemText, Stack  } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useContext } from "react";                       // <== IMPORT 
import { AuthContext } from "../../context/auth.context"; 
import JamFilterByDate from '../../components/JamFilters/JamFilterByDate';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { JamContext } from '../../context/jams.context';
import { searchJamsByDate } from '../../services/jams.services';
import ButtonOut from '../../components/ButtonOut/ButtonOut';
import ButtonGoToDetails from '../../components/ButtonGoToDetails/ButtonGoToDetails';
import ButtonIn from '../../components/ButtonIn/ButtonIn';
import { format } from "date-fns";
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';

const API_URL = process.env.REACT_APP_API_URL

function JamListPage() {
    const [jams, setjams] = useState([])
    const [cloneJams,setCloneJams] = useState(jams)
    const { user,isLoggedIn } = useContext(AuthContext)  
    const {allJams} = useContext(JamContext)  
    
    useEffect(()=>{
        setjams(allJams)
        setCloneJams(allJams)
        
    },[allJams])

    useEffect(()=>{
        axios.get(`${API_URL}/jams`)
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
                {isLoggedIn &&
                    <>
                    <ButtonIn jamId={jam._id} user={user}/>
                    <ButtonOut jamId={jam._id} user={user}/>
                    </>
                }
                
                </Stack>
            }
            >
            <ListItemText 
            key={jam._id}
            secondary={`${jam.name}`} 
            primary={<Stack direction="row" spacing={2} id="stackDate">
                    <EventIcon sx={{ color:'red' }}/>
                    <Typography sx={{color:'red'}} variant="body2" gutterBottom component="div">
                        {format(new Date(jam.date),'dd-MM-yyyy')}
                    </Typography>
            </Stack>}
            />
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