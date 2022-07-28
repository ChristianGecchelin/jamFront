import { TextField } from "@mui/material"

function JamDatePicker(props) {
    const {value,set} = props

    return(
        <TextField
        type="date"
        name="limitDate"
        value={value}
        onChange={set}/>        
    )
}

export default JamDatePicker