import {Button,Link} from '@mui/material';

function ButtonGoToCreate () {
    
    return (
            <Button 
            sx={{mr:1,ml:1}}
            variant="contained"
            component={Link}
            href={`/createjam`}
            >Create a new Jam</Button>
    )
}
export default ButtonGoToCreate