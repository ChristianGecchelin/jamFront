import { useState, useEffect } from "react";
import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { TextField } from '@mui/material';

function JamFilterByDate(props) {
  const { searchJams, searchDateHome, setSearchDateHome } = props;
    const [searchDate,setSearchDate] = useState(new Date())
    const [date,setDate] = useState([])

    const handleDate = (e) => {
        searchJams(new Date(e.target.value))
        setSearchDate(new Date(e.target.value))
        setDate(e.target.value)
    }
  

  useEffect(() => {
    setSearchDate(searchDateHome);
  }, [searchDateHome]);

    return(
        <TextField
        type="date"
        name="Date"
        label=""
        value={date} 
        onChange={handleDate}/>
    )
    }
export default JamFilterByDate;
