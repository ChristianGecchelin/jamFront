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


function JamCard(props) {
    const {jam} = props
    const musicians = jam.musicians
    const host = jam.host

    return(
        <Card sx={{ maxWidth: 345 , color:"black"}}>
            <CardContent>
                <CardMedia
                    alt="green iguana"
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
                <Button size="small">I am in!</Button>
                <Button size="small">Back</Button>
            </CardActions>
        </Card>
    )
}

export default JamCard