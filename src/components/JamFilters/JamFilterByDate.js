import { useState, useEffect } from "react";
import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { TextField } from '@mui/material';

function JamFilterByDate(props) {
  const { searchJams, searchDateHome, setSearchDateHome,todayDate } = props;
    const [searchDate,setSearchDate] = useState(new Date())
    const [date,setDate] = useState([])

    const handleDate = (e) => {
        searchJams((e.target.value))
        setSearchDate((e.target.value))
        setDate(e.target.value)
        if (setSearchDateHome) {
            setSearchDateHome(e.target.value);}
    }
  

  useEffect(() => {
    if(searchDateHome){
      setDate(searchDateHome);
    }
  }, [searchDateHome]);

 /*  return <KeyboardDatePicker value={searchDate} onChange={handleDate} />; */
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
