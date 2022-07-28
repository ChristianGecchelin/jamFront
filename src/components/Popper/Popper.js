import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import JamCard from '../JamCard/JamCard';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClickAwayListener from '@mui/material/ClickAwayListener';


function SimplePopper(props) {
    const {jam, addJamToUserList} = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = (event) => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
        <ClickAwayListener onClickAway={handleClickAway}>
        <IconButton aria-describedby={id} aria-label="comment" type="button" onClick={handleClick}>
            <OpenInNewIcon/>
        </IconButton>
        </ClickAwayListener>  
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <JamCard jam={jam} back={handleClick} addJamToUserList={addJamToUserList}/>   
        </Popper>
        
        </div>
    );
    }
export default SimplePopper