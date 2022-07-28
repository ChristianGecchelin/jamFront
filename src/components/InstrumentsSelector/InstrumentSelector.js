import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const instruments = 
['Guitar','Drums','Bass','Piano','Singer','Harmonica','Saxophone','Trumpet']

function getStyles(instrument, personName, theme) {
    return {
    fontWeight:
        personName.indexOf(instrument) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props) {
    const {value,set} = props
    const theme = useTheme();
    const [instrumentName, setInstrumentName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        set(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
        <FormControl sx={{ m: 2, width: 'auto', minWidth: 200 }}>
            <InputLabel id="demo-multiple-chip-label">Instruments</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Instruments" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {instruments.map((instrument) => (
                <MenuItem
                key={instrument}
                value={instrument}
                style={getStyles(instrument, value, theme)}
                >
                {instrument}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}
