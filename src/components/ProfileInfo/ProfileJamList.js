import axios from 'axios';

//React
import { useState, useContext, useEffect} from "react";
import {AuthContext} from '../../context/auth.context'
import ButtonGoToDetails from '../ButtonGoToDetails/ButtonGoToDetails';
import ButtonOut from '../ButtonOut/ButtonOut';
import ButtonIn from '../ButtonIn/ButtonIn'; 
//Material UI
import {Paper, Divider, Box, List,ListItem,ListItemText,Typography   } from '@mui/material';
import { Stack } from 'react-bootstrap';


function ProfileJamList (props) {
    const{createdJams,
        setCreatedJams,
        registeredJams,
        setRegisteredJams, user}=props
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
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {createdJams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            secondaryAction={
                <ButtonGoToDetails jamId={jam._id}/>
            }
            >
            <ListItemText primary={`${jam.name} on ${jam.date}`} />
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
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {registeredJams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            >
            <ListItemText primary={`${jam.name} on ${jam.date}`} />
            <Stack spacing={1} direction='row'>
                    <ButtonGoToDetails jamId={jam._id}/>
                    <ButtonIn jamId={jam._id} user={user}/>
                    <ButtonOut jamId={jam._id} user={user}/>
                </Stack>
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