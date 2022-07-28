import axios from 'axios';
import { format } from "date-fns";

//React
import { useState, useContext, useEffect} from "react";
import {AuthContext} from '../../context/auth.context'
import ButtonGoToDetails from '../ButtonGoToDetails/ButtonGoToDetails';
import ButtonOut from '../ButtonOut/ButtonOut';
import ButtonIn from '../ButtonIn/ButtonIn'; 
//Material UI
import {Paper, Divider, Box, List,ListItem,ListItemText,Typography   } from '@mui/material';
import { Stack } from 'react-bootstrap';
import ButtonGoToEdit from '../ButtonGoToEdit/ButtonGoToEdit';
import ButtonGoToCreate from '../ButtonGoToCreate/ButtonGoToCreate';
import EventIcon from '@mui/icons-material/Event';

function ProfileJamList (props) {
    const{createdJams,
        setCreatedJams,
        registeredJams,
        setRegisteredJams, user}=props
    return(
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-evenly'
            sx={{
                width: '60%',
                height: 'auto',
                }}>
        <Paper
            display='flex'
            flexDirection='column'
            justifyContent='space-evenly'
            sx={{
                width: '90%',
                height: 'auto',
                mb:1, 
                p:1
                }}>     
        <Box>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            The jams I've created
        </Typography>
        <List sx={{ width: '100%' }}>
            {createdJams.length===0 &&
                <Box 
                display='flex'
                justifyContent='center'
                sx={{
                width: '100%',
                height: 'auto',
                }}> 
                <ButtonGoToCreate/>
                </Box>
            }
            {createdJams.map((jam) => (
            
            <ListItem
            sx={{width:'auto'}}
            alignItems="flex-start"
            key={jam._id}
            secondaryAction={
                <Stack direction='row' spacing={1} sx={{width:'40%'}}>
                <ButtonGoToDetails jamId={jam._id}/>
                <ButtonGoToEdit jamId={jam._id}/>
                </Stack>
            }
            >
            <ListItemText 
            primary={
                <Stack direction="row" spacing={1} id="stackDate">
                    <EventIcon sx={{ color:'red' }}/>
                    <Typography sx={{color:'red'}} variant="body2" gutterBottom component="div">
                        {format(new Date(jam.date),'dd-MM-yyyy')}
                    </Typography>
                </Stack>
            }
            secondary={`${jam.name} on ${jam.date}`} />
            </ListItem>
            
            ))}
        </List>
        </Box>
        </Paper>
        <Paper
            display='flex'
            flexDirection='column'
            justifyContent='space-evenly'
            sx={{
                width: '90%',
                height: 'auto',mt:1,p:1
                }}>
        <Box>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            The jams I've registered
        </Typography>
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {registeredJams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            secondaryAction={
                <Box 
                display='flex'
                flexDirection='row'>                
                    <ButtonGoToDetails jamId={jam._id}/>
                    <ButtonIn jamId={jam._id} user={user}/>
                    <ButtonOut jamId={jam._id} user={user}/>
                </Box>}
            >
            <ListItemText primary={
                <Box 
                display='flex'
                flexDirection='row'>
                    <EventIcon sx={{ color:'red' }}/>
                    <Typography sx={{color:'red'}} variant="body2" gutterBottom component="div">
                        {format(new Date(jam.date),'dd-MM-yyyy')}
                    </Typography>
                </Box>
            }
            secondary={`${jam.name}`}
            />
            </ListItem>
            <Divider/>
            </>
            ))}
        </List>
        </Box>
        </Paper>
        </Box>
    )
}
export default ProfileJamList