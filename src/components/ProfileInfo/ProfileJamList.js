import axios from 'axios';

//React
import { useState, useContext, useEffect} from "react";
import {AuthContext} from '../../context/auth.context'

import {Paper, Divider, Box, List,ListItem,ListItemText,SimplePopper,Typography   } from '@mui/material';


function ProfileJamList (props) {
    const{createdJams,
        setCreatedJams,
        registeredJams,
        setRegisteredJams}=props

    return(
        <Paper
            display='flex'
            flexDirection='column'
            justifyContent='space-evenly'
            sx={{
                width: '60%',
                height: 'auto',
                }}>

                
        
        <Box>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            The jams I've created
        </Typography>
        <List sx={{ width: '60%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {createdJams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            >
            <ListItemText primary={`${jam.name} on ${jam.date}`} />
            {jam.host &&
                <ListItemText primary={`Organized by: ${jam.host.username}`} />
            }
            </ListItem>
            <Divider/>
            </>
            ))}
        </List>
        </Box>
        <Box>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            The jams I've registered
        </Typography>
        <List sx={{ width: '60%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {registeredJams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            >
            <ListItemText primary={`${jam.name} on ${jam.date}`} />
            {jam.host &&
                <ListItemText primary={`Organized by: ${jam.host.username}`} />
            }
            </ListItem>
            <Divider/>
            </>
            ))}
        </List>
        </Box>
        
        </Paper>
    )
}
export default ProfileJamList