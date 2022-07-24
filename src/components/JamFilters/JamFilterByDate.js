import { useState } from 'react';
import React from 'react';
import {DatePicker} from '@material-ui/pickers';

function JamFilterByDate(props) {
    const {searchJams} = props
    const [searchDate,setSearchDate] = useState(new Date())

    const handleDate = (e) => {
        console.log(e)
        searchJams(new Date(e))
        setSearchDate(new Date(e))
    }

    return(
        <DatePicker value={searchDate} onChange={handleDate} />
    )
}
export default JamFilterByDate