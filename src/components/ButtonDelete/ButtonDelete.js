import {Button,Link} from '@mui/material';

function DeleteButton (props) {
    const {jamId} = props

    return (
            <Button 
            sx={{mr:1,ml:1}}
            size="small"
            variant="contained"
            color='danger'
            component={Link}
            href={`/jams/${jamId}`}
            >Delete</Button>
    )
}
export default DeleteButton