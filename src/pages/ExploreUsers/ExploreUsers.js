import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FilterUsers from "../../components/FilterUsers/FilterUsers";
import ListUsers from "../../components/ListUsers/ListUsers";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";
const ExploreUsers = () => {
  const { user } = useContext(AuthContext);
  const [usersDB, setUsers] = useState([]);
  const [param, setParams] = useState("");
  const getUsers = () => {
    axios
      .get(`${API_URL}/api/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getSearchParams = (params) => {
    setParams(params);
  };

  const filterUsers=()=>{
    let usersFilteredByInstrument
    let usersFilteredByName = usersDB.filter((userSelected) => {
        
        if (param.search === "") {
          return (
            userSelected.username.toLowerCase() !== user.username.toLowerCase()
          );
        } else {
          return userSelected.username
            .toLowerCase()
            .includes(param.search.toLowerCase());
        }
      });
    

      if (param.instrument && param.instrument.length>0) {
        console.log(param.instrument.length>0)
        debugger
        usersFilteredByInstrument=param.instruments.map((instrument)=>{
            debugger
            for (let i = 0; i < usersFilteredByName.length; i++) {
                debugger
               return (usersFilteredByName[i].instruments.value===(instrument.value))
              }
          })
      }
     else{
        usersFilteredByInstrument=usersFilteredByName
     }
     setUsers(usersFilteredByInstrument)

   /*  let usersFiltered = usersDB.filter((userSelected) => {
      if (param.search === "") {
        return (
          userSelected.username.toLowerCase() !== user.username.toLowerCase()
        );
      } else {
        return userSelected.username
          .toLowerCase()
          .includes(param.search.toLowerCase());
      }
    });
    setUsers(usersFiltered); FUNCIONA FILTRA SOLO USUARIOS */
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(()=>{
    console.log(param)
    filterUsers()
  },[param])
  return (
    <>
      <FilterUsers getSearchParams={getSearchParams} />
      <ListUsers users={usersDB} />
    </>
  );
};

export default ExploreUsers;
