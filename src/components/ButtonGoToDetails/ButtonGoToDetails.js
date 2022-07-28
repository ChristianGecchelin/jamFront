import {Button,Link} from '@mui/material';

function ButtonGoToDetails (props) {
    const {jamId} = props
    return (
            <Button 
            size="small"
            variant="contained"
            component={Link}
            href={`/jams/${jamId}`}
            >Details</Button>
    )
}
export default ButtonGoToDetails