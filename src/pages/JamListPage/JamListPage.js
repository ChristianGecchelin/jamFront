import { useState, useEffect, useContext } from "react"; // <== IMPORT
import { List, ListItem, ListItemText, Stack } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import JamFilterByDate from "../../components/JamFilters/JamFilterByDate";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { JamContext } from "../../context/jams.context";
import { searchJamsByDate } from "../../services/jams.services";
import ButtonOut from "../../components/ButtonOut/ButtonOut";
import ButtonGoToDetails from '../../components/ButtonGoToDetails/ButtonGoToDetails';
import ButtonIn from '../../components/ButtonIn/ButtonIn';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';
import { format } from "date-fns";
const API_URL = process.env.REACT_APP_API_URL

function JamListPage(props) {
  const { jamsForHome, setJamsForHome, searchDate, setSearchDate } = props;
  const [jams, setjams] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [cloneJams, setCloneJams] = useState(jams);
  const { user,isLoggedIn } = useContext(AuthContext);
  const { allJams, setAllJams } = useContext(JamContext);
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

  useEffect(() => {
    axios
      .get(`${API_URL}/api/jams`)
      .then((allJams) => {
        setjams(allJams.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{ width: "90%", m: 2 }}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      flexWrap={'wrap'}
    >
      <Box sx={{ width: "100%", minWidth:'100%' }}>
        <JamFilterByDate
          searchJams={(e) => {
            setjams(searchJamsByDate(e, cloneJams));
          }}
          setSearchDateHome={setSearchDate}
          searchDateHome={searchDate}
        />
      </Box>
      <Box sx={{ width: "100%",minWidth:'400px' }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {jams.map((jam) => (
            <>
            <ListItem
            key={jam._id}
            secondaryAction={
                <Stack direction="row">
                <ButtonGoToDetails jamId={jam._id}/>
                {isLoggedIn &&
                    <>
                    <ButtonIn jamId={jam._id} user={user}/>
                    <ButtonOut jamId={jam._id} user={user}/>
                    </>
                }
                
                </Stack>
            }
            >
            <ListItemText 
            key={jam._id}
            secondary={`${jam.name}`} 
            primary={<Stack direction="row" spacing={2} id="stackDate">
                    <EventIcon sx={{ color:'red' }}/>
                    <Typography sx={{color:'red'}} variant="body2" gutterBottom component="div">
                        {format(new Date(jam.date),'dd-MM-yyyy')}
                    </Typography>
            </Stack>}
            />
            </ListItem>
            <Divider/>
            </>
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default JamListPage;
