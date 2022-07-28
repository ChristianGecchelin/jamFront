import { useParams,useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import { format, setDate } from "date-fns";
import { deleteJam } from "../../services/jams.services";
import { JamContext } from "../../context/jams.context";

//MATERIAL UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarRateIcon from '@mui/icons-material/StarRate';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EventIcon from '@mui/icons-material/Event';
import { Button } from "@mui/material";

const API_URL = "http://localhost:5005";

function JamDetailPage () {
    const { user } = useContext(AuthContext)  
    const {jamId} = useParams()  
    const [jam, setJam] = useState([])
    const [host, setHost] = useState([])
    const [musicians, setMusicians] = useState([])
    const [date,setDate] = useState("")
    const [categories,setCategories] = useState([])
    const [hostPicture,setHostPicture] = useState([])
    const [hostUsername,setHostUsername] = useState([])
    const {setAllJams} = useContext(JamContext)

    useEffect(()=>{
            axios
            .get(`${API_URL}/api/jams/${jamId}`)
            .then((response)=>{
            const jamFound = response.data
            setJam(jamFound)
            setHost(jamFound.host)
            setMusicians(jamFound.musicians)
            setCategories(jamFound.categories)
            const date = new Date(jamFound.date);
            const formatedDate = format(date, "dd-MM-yyyy");
            setDate(formatedDate)
            setHostPicture(jamFound.host.picture)
            setHostUsername(jamFound.host.username)
            })
            .catch(err=>console.log(err))
        },[])
    
        return(
            <Box 
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{ width: '100%', m:2}}
            >
            <Box 
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{ width: '60%', }}>
                <Stack direction="row" spacing={2} id="stackDate">
                    <EventIcon sx={{ color:'red' }}/>
                    <Typography sx={{color:'red'}} variant="h5" gutterBottom component="div">
                        {date}
                    </Typography>
                </Stack>
                <Typography variant="h4" gutterBottom component="div">
                    {jam.name}
                </Typography>
                {host &&
                <Stack direction="row" spacing={2}>
                    <Typography variant="h5" gutterBottom component="div">
                        Organized by :
                    </Typography>
                    
                    <Chip
                        avatar={<Avatar>{hostPicture}</Avatar>}
                        label={host.username}
                        variant="outlined"
                    />
                </Stack>}
            </Box>
            
            <Box 
            sx={{ 
                width: '60%' ,
                m:2,
                }}>
                <Paper elevation={3} sx={{p:2}}>
                    <Typography variant="h6" gutterBottom component="div" sx={{ 
                        m:1}}>
                        Details
                    </Typography>
                    {musicians.length > 0 &&
                    <Box

                        sx={{ 
                        m:1}}
                    >
                    <Typography variant="subtitle1" gutterBottom component="div">
                        Musicians
                    </Typography> 
                    <Stack direction="row" spacing={2}>
                        {musicians.map((musician)=>(
                            <Avatar alt="musician face" src={musician.picture} />                            
                        ))}
                    </Stack>
                    </Box>
                    }
                    {categories.length > 0 && 
                    <Stack direction="row" spacing={1} sx={{ 
                        m:1}}>
                        {categories.map((category)=>(
                            <Chip label={category.label}/>
                        ))}
                    </Stack>
                    }
                    {jam.description &&
                        <Box
                        sx={{ 
                        m:1}}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            About
                        </Typography>
                        <Typography variant="body2" gutterBottom component="div">
                            {jam.description}
                        </Typography>
                        </Box>
                    }
                </Paper>
            </Box>
        
        </Box>
    )
    }
    


export default JamDetailPage