import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import JamDatePicker from '../../components/DatePicker';

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const API_URL = process.env.REACT_APP_API_URL

function EditJam () {
    const {jamId} = useParams()    
    const navigate = useNavigate()
    const musicalGenre = [{value:'Jazz',label:'Jazz'},
    {value:'Funk',label:'Funk'},
    {value:'Blues',label:'Blues'},
    {value:'Rock',label:'Rock'},
    {value:'Soul',label:'Soul'},
    {value:'Metal',label:'Metal'},
    {value:'Hip-Hop',label:'Hip-Hop'},
    {value:'Other',label:'Other'},
    {value:'All kind',label:'All kind'},]
    const [name,setName] = useState("")
    const [date,setDate] = useState(new Date(Date.now))
    const [description,setDescription] = useState("")
    const [limit,setLimit] = useState(false)
    const [categories,setCategories] = useState([])
    const { user } = useContext(AuthContext);
    const animatedComponents = makeAnimated();

    useEffect(()=>{
        axios
        .get(`${API_URL}/jams/${jamId}`)
        .then((response)=>{
            const jamFound = response.data
            setName(jamFound.name)
            setDate(jamFound.date)
            setDescription(jamFound.description)
            setLimit(jamFound.limit)
            setCategories(jamFound.categories)
        })
        .catch(err=>console.log(err))
    },[jamId])  

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {name, date, description, limit, categories,userId:user._id}
        axios
        .put(`${API_URL}/jams/${jamId}`, requestBody)
        .then(()=>{
            setName("")
            setDate(new Date(Date.now))
            setDescription("")
            setLimit(false)
            setCategories([])
            navigate('/')
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
			>
                <Typography component="h1" variant="h5">
                    Edit you jam
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
						<TextField
						name="name"
						required
						fullWidth
						id="name"
						label="Name your jam"
						autoFocus
						value={name} 
						onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
                    <Grid item xs={12}>
                        <JamDatePicker value={date} set={(e) => setDate (e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        renderInput={(params) => <TextField {...params} label="Address" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
						<TextField
						required
						fullWidth
						name="description"
						label="Description"
						type="text"
						id="description"
						value={description} 
						onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>
                    <Grid item xs={12}>
                        <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[musicalGenre[8]]}
                        isMulti
                        options={musicalGenre}
                        onChange={(e) => setCategories(e)}
                        />
					</Grid>
                </Grid>
                <Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</Button>
                </Box>
            </Box>
        </Container>
    
    )
}

export default EditJam