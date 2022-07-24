import { List,IconButton,ListItem,ListItemText  } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import JamFilterByDate from '../../components/JamFilters/JamFilterByDate';
import JamFilterByCategory from '../../components/JamFilters/JamFileterByCategory';

const API_URL = "http://localhost:5005"; 

function JamListPage() {
    const [jams, setjams] = useState([])
    const [cloneJams,setCloneJams] = useState(jams)
    const [cat,setCat] = useState(cloneJams.categories)

    const searchJamsByDate = (date) => {
        //Convert the date without the hours
        let convertedDate = date.setHours(0,0,0,0)
        const updatedJams = cloneJams.filter((cloneJam)=>{
            if(convertedDate===null){
                return cloneJam
            }else{
                //Convert the date into a date object, without the hours
                let convertedJamDate = new Date(cloneJam.date).setHours(0,0,0,0)
                return convertedJamDate === convertedDate
            }
        })
        setjams(updatedJams)
    }

    const searchJamByCategory = (categoriesList) => {
        const catList = cloneJams.categories
        console.log('CLONEJAM',cloneJams)
        console.log('CATLIST',cat)
        const updatedJams = cloneJams.filter((jam)=>{
            if(categoriesList.length === 0){
                return jam
            }else{
                return categoriesList.includes(jam.categories)
            }
        })
        setjams(updatedJams)
    }

    useEffect(()=>{
        axios
        .get(`${API_URL}/api/jams`)
        .then((allJams) => 
        {setjams(allJams.data)
        setCloneJams(allJams.data)})
        .catch(err=>console.log(err))
    },[])
    return (
        <>
        <JamFilterByDate searchJams={searchJamsByDate}/>
        <JamFilterByCategory searchJams={searchJamByCategory}/>
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {jams.map((jam) => (
            <ListItem
            key={jam._id}
            secondaryAction={
                <IconButton aria-label="comment">
                    <OpenInNewIcon/>
                </IconButton>
            }
            >
            <ListItemText primary={`${jam.name}             ${jam.date}`} />
            </ListItem>
            ))}
        </List>
        </>
    )
}
export default JamListPage