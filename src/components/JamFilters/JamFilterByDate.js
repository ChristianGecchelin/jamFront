import { useState } from 'react';
import React from 'react';
import { TextField } from '@mui/material';

function JamFilterByDate(props) {
    const {searchJams} = props
    const [searchDate,setSearchDate] = useState(new Date())
    const [date,setDate] = useState([])

    const handleDate = (e) => {
        searchJams(new Date(e.target.value))
        setSearchDate(new Date(e.target.value))
        setDate(e.target.value)
    }

    return(
        <TextField
        type="date"
        name="limitDate"
        value={date} 
        onChange={handleDate}/>
    )
}
export default JamFilterByDate