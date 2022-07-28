import axios from 'axios';

//Components
import MultipleSelectChip from "../InstrumentsSelector/InstrumentSelector";
import ProfilePictureList from '../ImageList/ImageList';

//React
import { useState,useContext, useEffect } from "react";
import {AuthContext} from '../../context/auth.context'

//Material UI
import { 
    Avatar, IconButton,Box,
    Chip, Typography,Paper,
    Button, TextField, Modal 
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function ProfileInfo(props){
    const {user} = props
    const [open, setOpen] = useState(false);
    const [editMode,setEditMode] = useState(false)
    const [about,setAbout] = useState("")
    const [instruments,setInstruments] = useState([])
    const [currentUser,setCurrentUser] = useState([])
    const [image,SetImage] = useState("")
    
    useEffect(()=>{
            setCurrentUser(user)
            setAbout(user.about)
            SetImage(user.picture)
            setInstruments(user.instruments)
        },[user])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };


    function handleSubmit(e){
        e.preventDefault()
        const requestBody = {instruments:instruments,about,picture:image}
        axios
        .put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, requestBody)
        .then((modifiedUser)=>{
            const user = modifiedUser.data
            setCurrentUser(user)
            setAbout(user.about)
            setInstruments(user.instruments)
            SetImage(user.picture)
            setEditMode(false)
        })
    }

    if(editMode){
        return(
            <Paper
            sx={{
                width: '30%',
                height: 'auto',
                p: 2
                }}>
            <Box
                sx={{
                width: '90%',
                height: 'auto',
                p: 2
                }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                component="form"
                onSubmit={handleSubmit}
            >
            <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ width: 130, height: 130 }}
            />
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleOpen}>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box>
                        <ProfilePictureList value={image} set={SetImage} close={handleClose}/>  
                    </Box>       
                </Modal>
            <PhotoCameraIcon />
            </IconButton>
            <MultipleSelectChip value={instruments} set={setInstruments} />
            <TextField
                id="outlined-multiline-flexible"
                label="About"
                multiline
                maxRows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <Box sx={{
                width: '70%',
                height: 'auto',
                p: 2
                }}
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                flexWrap='wrap'
                >
            <Button 
            variant="contained" 
            type="submit"
            sx={{
                mt: 2
                }}
            >Submit</Button>
            <Button 
            variant="outlined"
            onClick={()=>{
                setEditMode(false)}}
            sx={{
                mt:2,
                }}
            >Back</Button>
            </Box>
            </Box>
            </Paper>
            
            )
    }else{
        return(
            <Box
                sx={{
                width: '30%',
                height: 'auto',
                p: 2
                }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                component={Paper}
            >
            <Avatar
                alt="Remy Sharp"
                src={currentUser.picture}
                sx={{ width: 130, height: 130 }}
            />
            {currentUser.instruments&& 
            <Box display = 'flex'
            flexDirection="row" 
            flexWrap="wrap"
            justifyContent='space-evenly'
            spacing={1} 
            sx={{
                width: '80%',
                m : 2,
                }}
            >
            {currentUser.instruments.map((instrument)=>{
                return(
                <Chip label={instrument} 
                variant="outlined" 
                sx={{
                m : 1,
                }}
                />)
            })}
            </Box>}
            {currentUser.about&&
            <Typography 
            variant="body2" 
            textAlign="center"
            gutterBottom 
            component="div"
            sx={{
                m:2,
                width: '50%',
                height: 'auto',
                }}>
                {currentUser.about}
            </Typography>}
            <Button 
            variant="contained" 
            onClick={()=>{setEditMode(true)}}
            sx={{
                m: 2
                }}
            >Edit</Button>
            </Box>
            
            )
            }
    
}

export default ProfileInfo