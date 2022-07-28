import {Button,Link} from '@mui/material';

function ButtonGoToEdit (props) {
    const {jamId} = props
    return (
            <Button 
            size="small"
            variant="contained"
            component={Link}
            href={`/editjam/${jamId}`}
            >Edit</Button>
    )
}
export default ButtonGoToEdit