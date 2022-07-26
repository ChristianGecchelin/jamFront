import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DatePicker } from "@material-ui/pickers";
import SearchBar from "../../components/SearchBar/SearchBar"
import SearchResults from "../../components/SearchResults/SearchResults";

const API_URL = "http://localhost:5005";

function CreateJam() {
  const navigate = useNavigate();
  const musicalGenre = [
    { value: "Jazz", label: "Jazz" },
    { value: "Funk", label: "Funk" },
    { value: "Blues", label: "Blues" },
    { value: "Rock", label: "Rock" },
    { value: "Soul", label: "Soul" },
    { value: "Metal", label: "Metal" },
    { value: "Hip-Hop", label: "Hip-Hop" },
    { value: "Other", label: "Other" },
    { value: "All kind", label: "All kind" },
  ];
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date(Date.now));
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const animatedComponents = makeAnimated();

  const debounceRef = useRef();
  const { searchPlacesByTerm,places } = useContext(AuthContext);

  const onQueryChange = (search) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(search);
    }, 500);
  };
  let objetoBlaise=[]
  console.log(places)
  const handlerPlaces=()=>{
   /* let names= places.map((place)=>place.place_name_es) */
   for (const place of places) {
    objetoBlaise.push({'label':place.place_name_es,'center':place.center})
   }
   console.log(objetoBlaise)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      date,
      description,
      limit,
      categories,
      userId: user._id,
    };
    axios.post(`${API_URL}/api/jams`, requestBody).then(() => {
      setName("");
      setDate(new Date(Date.now));
      setDescription("");
      setLimit(false);
      setCategories([]);
      navigate("/");
    });
  };
  useEffect(() => {
    if (search.length > 0) {
      onQueryChange(search);
      
    }
  }, [search]);
  useEffect(()=>{
    handlerPlaces()
  },[places])
  return (
    <Form onSubmit={handleSubmit} id="form-task">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name your jam</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
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
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Buscar Place</Form.Label>
        <Form.Control
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
        </Form.Control>
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
  );
}

export default CreateJam;
