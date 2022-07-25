import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {DatePicker} from '@material-ui/pickers';

const API_URL = "http://localhost:5005";

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
        .get(`${API_URL}/api/jams/${jamId}`)
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
        </Form>
    
    )
}

export default EditJam