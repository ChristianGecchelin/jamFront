import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { registerToJam } from '../../services/jams.services';
import { ClickAwayListener  } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    };

export default function RegisterModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);}
    const handleClose = () => setOpen(false);
    const {jamId, user} = props
    
    return (
    <div>
        <Button onClick={()=>{
            handleOpen()
            registerToJam(jamId,user)
            }}>I am In ! </Button>
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box style={style}>
        <ClickAwayListener onClickAway={handleClose}>
            <Alert severity="success">You were correctly registered to this Jam !<br/>
            See you in the shed!</Alert>
        </ClickAwayListener>    
        </Box>
        
        </Modal>
    </div>
    );
    }
