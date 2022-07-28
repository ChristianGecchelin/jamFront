import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { DatePicker } from "@material-ui/pickers";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import { JamContext } from "../../context/jams.context";

//material UI
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import JamDatePicker from "../../components/DatePicker";

//material UI

const API_URL = "http://localhost:5005";

function CreateJam() {
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
  const navigate = useNavigate();

  const debounceRef = useRef();
  const { searchPlacesByTerm, places, user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date(Date.now));
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [locationSelected, setLocationSelected] = useState("");
  const { setAllJams } = useContext(JamContext);

  const animatedComponents = makeAnimated();

  const onQueryChange = (search) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(search);
    }, 500);
  };
  let objetoBlaise = [];
  const handlerPlaces = () => {
    /* let names= places.map((place)=>place.place_name_es) */
    for (const place of places) {
      objetoBlaise.push({ label: place.place_name_es, center: place.center });
      setPlaceList(objetoBlaise);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      date,
      description,
      limit,
      location: locationSelected,
      categories,
      userId: user._id,
    };
    axios
      .post(`${API_URL}/api/jams`, requestBody)
      .then(() => {
        setName("");
        setDate(new Date(Date.now));
        setDescription("");
        setLimit(false);
        setCategories([]);
        navigate("/jams");
      })
      .then(() => {
        axios.get(`${API_URL}/api/jams`).then((jams) => {
          setAllJams(jams.data);
        });
      });
  };
  const handlerSelect = (event, values) => {
    setLocationSelected(values);
  };
  useEffect(() => {
    if (search.length > 0) {
      onQueryChange(search);
    }
  }, [search]);
  useEffect(() => {
    handlerPlaces();
  }, [places]);

  if (placeList.length === 0) {
    return (
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: "primary.light" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create a new Jam
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                <JamDatePicker
                  value={date}
                  set={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Search your place"
                  type="text"
                  name="search"
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
    );
  } else {
    return (
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: "primary.light" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create a new Jam
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                <JamDatePicker
                  value={date}
                  set={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Search your place"
                  type="text"
                  name="search"
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={placeList}
                  onChange={handlerSelect}
                  renderInput={(params) => (
                    <TextField {...params} label="Address" />
                  )}
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
    );
  }
}

export default CreateJam;
