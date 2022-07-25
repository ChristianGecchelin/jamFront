import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import JamCard from './JamCard/JamCard';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function SimplePopper(props) {
    const {jam} = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
        <IconButton aria-describedby={id} aria-label="comment" type="button" onClick={handleClick}>
            <OpenInNewIcon/>
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <JamCard jam={jam} back={handleClick}/>
        </Popper>
        </div>
    );
    }
export default SimplePopper