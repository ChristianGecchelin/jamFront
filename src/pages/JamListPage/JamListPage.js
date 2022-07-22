import { List,IconButton,ListItem,ListItemText  } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import JamFilter from '../../components/JamFilter/JamFilter';

const API_URL = "http://localhost:5005"; 

function JamListPage() {
    const [jams, setjams] = useState([])
    useEffect(()=>{
        axios
        .get(`${API_URL}/api/jams`)
        .then(allJams => setjams(allJams.data))
        .catch(err=>console.log(err))
    },[])
    return (
        <>
        <JamFilter/>
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {jams.map((jam) => (
            <ListItem
            key={jam._id}
            secondaryAction={
                <IconButton aria-label="comment">
                    <OpenInNewIcon/>
                </IconButton>
            }
            >
            <ListItemText primary={`${jam.name}             ${jam.date}`} />
            </ListItem>
            ))}
        </List>
        </>
    )
}
export default JamListPage