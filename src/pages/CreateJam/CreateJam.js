import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';


//material UI
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const API_URL = "http://localhost:5005";


function CreateJam () {
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
    const [placeList,setPlaceList] = useState([])
    const { user } = useContext(AuthContext);
    const animatedComponents = makeAnimated();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {name, date, description, limit, categories,userId:user._id}
        axios
        .post(`${API_URL}/api/jams`, requestBody)
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
        <Container component="main" maxWidth="xs" sx={{ bgcolor: 'primary.light' }}>
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
                    Create a new Jam
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
                        <KeyboardDatePicker value={date} onChange={setDate} />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={placeList}
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
        /*
        <Form onSubmit={handleSubmit} id="form-task">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name your jam</Form.Label>
                <Form.Control type="text" name="name" value={name}
                placeholder="Enter the name of your project" 
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Date</Form.Label>
                <DatePicker value={date} onChange={setDate} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Limit</Form.Label>
                <Form.Check 
                type="checkbox" 
                label="Limit"
                checked={limit}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Categories</Form.Label>
                <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[musicalGenre[8]]}
                isMulti
                options={musicalGenre}
                onChange={(e) => setCategories(e)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>*/
    
    )
}

export default CreateJam;