import {Button,Link} from '@mui/material';

function ButtonGoToCreate () {
    
    return (
            <Button 
            variant="contained"
            component={Link}
            href={`/createjam`}
            >Create a new Jam</Button>
    )
}
export default ButtonGoToCreate