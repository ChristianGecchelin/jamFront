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
    const [currentUser,setCurrentUser] = useState([])
    const navigate = useNavigate()
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
            })
            .catch(err=>console.log(err))
        
        },[])
    
        return(
            <>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
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
                        avatar={<Avatar>{host.username}</Avatar>}
                        label={host.username}
                        variant="outlined"
                    />
                    {host.rating && 
                    <Chip icon={<StarRateIcon/>} label={host.rating}/>                
                    }
                </Stack>}
            </Box>
            
            <Box sx={{ width: '100%', maxWidth: 400 }}>
                <Paper elevation={3}>
                    <Typography variant="h3" gutterBottom component="div">
                        Informaciones
                    </Typography>
                    {musicians.length > 0 && 
                    <AvatarGroup max={4}>
                        {musicians.map((musician)=>(
                            <Avatar alt="musician face" src={musician.picture} />
                        ))}
                    </AvatarGroup>
                    }
                    {categories.length > 0 && 
                    <Stack direction="row" spacing={1}>
                        {categories.map((category)=>(
                            <Chip label={category.label}/>
                        ))}
                    </Stack>
                    }
                    {jam.limit ? 
                    (<Stack direction="row" spacing={2}>
                        <LockIcon/>
                        <Typography variant="body1" gutterBottom component="div">
                            Aforo limitado
                        </Typography>
                    </Stack>):
                    (<Stack direction="row" spacing={2}>
                        <LockOpenIcon/>
                        <Typography variant="body1" gutterBottom component="div">
                            Sin limite de aforo
                        </Typography>
                    </Stack>)}
                    {jam.description &&
                        <>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Acerca del evento
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div">
                            {jam.description}
                        </Typography>
                        </>
                    }
                </Paper>
            </Box>

            <Box sx={{ width: '100%', maxWidth: 400 }}>
                <Paper elevation={3}>
                    <h4>MAP</h4>
                </Paper>
            </Box>
        
        </>
    )
    }
    


export default JamDetailPage