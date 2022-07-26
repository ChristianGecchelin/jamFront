import React, { useState } from 'react';
import {DatePicker} from '@material-ui/pickers';

function JamDatePicker() {
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
        <DatePicker value={selectedDate} onChange={handleDateChange} />
    )
}

export default JamDatePicker