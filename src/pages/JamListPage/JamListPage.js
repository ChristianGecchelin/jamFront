import { List, ListItem, ListItemText,Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react"; // <== IMPORT
import { AuthContext } from "../../context/auth.context";
import JamFilterByDate from "../../components/JamFilters/JamFilterByDate";
import JamFilterByCategory from "../../components/JamFilters/JamFileterByCategory";
import SimplePopper from "../../components/Popper";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { JamContext } from "../../context/jams.context";
import { searchJamsByDate } from '../../services/jams.services';
import ButtonOut from '../../components/ButtonOut/ButtonOut';
import ButtonGoToDetails from '../../components/ButtonGoToDetails/ButtonGoToDetails';
import ButtonIn from '../../components/ButtonIn/ButtonIn';
const API_URL = "http://localhost:5005";


function JamListPage(props) {
  const { jamsForHome, setJamsForHome, searchDate,setSearchDate } = props;
  const [jams, setjams] = useState([]);
  const [currentUser,setCurrentUser] = useState([])
  const [cloneJams, setCloneJams] = useState(jams);
  const { user } = useContext(AuthContext);
  const { allJams,setAllJams } = useContext(JamContext);
  /* const searchJamsByDate = (date) => {
    //Convert the date without the hours
    let convertedDate = date.setHours(0, 0, 0, 0);
    const updatedJams = cloneJams.filter((cloneJam) => {
      if (convertedDate === null) {
        return cloneJam;
      } else {
        //Convert the date into a date object, without the hours
        let convertedJamDate = new Date(cloneJam.date).setHours(0, 0, 0, 0);
        return convertedJamDate === convertedDate;
      }
    });
    setjams(updatedJams);
    if(setJamsForHome){
        setJamsForHome(updatedJams);}
  }; */

  useEffect(() => {
    setjams(jamsForHome);
  }, [jamsForHome]);
  /*useEffect(()=>{
        axios
        .get(`${API_URL}/api/jams`)
        .then((allJams) => 
        {setjams(allJams.data)
        setCloneJams(allJams.data)})
        .catch(err=>console.log(err))
    },[])*/

  useEffect(() => {
    setjams(allJams);
    setCloneJams(allJams);
  }, [allJams]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/jams`)
    .then((allJams)=>{
        setjams(allJams.data)
    })
    .catch(err=>console.log(err))
},[])

  return (
    <Box 
    sx={{ width: '90%',m:2}}
    display='flex'
    flexDirection='row'
    justifyContent='space-between'>
    <Box sx={{ width: '10%'}}>
    <JamFilterByDate searchJams={(e)=>{
        setjams(searchJamsByDate(e,cloneJams))
        
    }}
    setSearchDateHome={setSearchDate}
    searchDateHome={searchDate}/>
    </Box>
    <Box sx={{ width: '80%',}}>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {jams.map((jam) => (
        <>
        <ListItem
        key={jam._id}
        secondaryAction={
            <Stack direction="row">
            <ButtonGoToDetails jamId={jam._id}/>
            <ButtonIn jamId={jam._id} user={user}/>
            <ButtonOut jamId={jam._id} user={user}/>
            </Stack>
        }
        >
        <ListItemText primary={`${jam.name}        ${jam.date}`} />
        </ListItem>
        <Divider/>
        </>
        ))}
    </List>
    </Box>
    </Box>
  );



export default JamListPage;
