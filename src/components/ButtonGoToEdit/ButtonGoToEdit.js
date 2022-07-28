import {Button,Link} from '@mui/material';

function ButtonGoToEdit (props) {
    const {jamId} = props
    return (
            <Button 
            sx={{mr:1,ml:1}}
            size="small"
            variant="contained"
            component={Link}
            href={`/editjam/${jamId}`}
            >Edit</Button>
    )
}
export default ButtonGoToEdit