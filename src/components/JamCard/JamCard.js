import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:5005"; 



function JamCard(props) {
    const {jam,back} = props
    const musicians = jam.musicians
    const host = jam.host
    const { user } = useContext(AuthContext);

    //Add Jam to the User jams List
    function addJamToUserList(jamId) {
        axios.get(`${API_URL}/api/jams/${jamId}`)
        .then((foundJam)=>{
            let musicians = foundJam.data.musicians
            const musiciansIds = musicians.map(musician=>musician._id)
            if(musiciansIds.includes(user._id)){
                throw new Error ('YA ESTAS INSCRITO')
            }
            musicians.push(user)
            axios.put(`${API_URL}/api/jams/${jamId}`,{musicians})
            .then((response)=>console.log(response))
        })
        .catch(err=>console.log(err))
    }

    return(
        <Card sx={{ maxWidth: 345 , color:"black"}}>
            <CardContent>
                <CardMedia
                    height="100"
                    >
                <Stack direction="row" spacing={1}>
                    {host.picture ? 
                    (<Chip
                        avatar={<Avatar alt={host.username} src={host.picture} />}
                        label={host.username}
                        variant="outlined"
                    />) : 
                    (<Chip
                        avatar={<Avatar>{host.username[0]}</Avatar>}
                        label={host.username}
                        variant="outlined"
                    />)
                    }
                </Stack>
                </CardMedia>
                <Typography gutterBottom variant="h5" component="div">
                {jam.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                {jam.date}
                </Typography>
                {musicians.length > 0 && 
                    <AvatarGroup max={4}>
                        {musicians.map((musician)=>(
                            <Avatar alt="musician face" src={musician.picture} />
                        ))}
                    </AvatarGroup>
                }
                {jam.categories > 0 && 
                    <Stack direction="row" spacing={1}>
                        {jam.categories.map((category)=>(
                            <Chip label={category.label}/>
                        ))}
                    </Stack>
                }
            </CardContent>
            <CardActions>
                {user &&
                    <Button size="small" onClick={()=>addJamToUserList(jam._id)}>I am in!</Button>
                }
                <Button size="small" component={Link} to={`/jams/${jam._id}`}>Details</Button>
                <Button size="small"  onClick={back}>Back</Button>
            </CardActions>
        </Card>
    )
}

export default JamCard