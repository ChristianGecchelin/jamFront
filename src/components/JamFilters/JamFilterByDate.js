import { useState, useEffect } from "react";
import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function JamFilterByDate(props) {
  const { searchJams, searchDateHome, setSearchDateHome } = props;
  const [searchDate, setSearchDate] = useState(new Date());

  const handleDate = (e) => {
    searchJams(new Date(e));
    setSearchDate(new Date(e));
    if (setSearchDateHome) {
      setSearchDateHome(new Date(e));
    }
  };

  useEffect(() => {
    setSearchDate(searchDateHome);
  }, [searchDateHome]);
  return <KeyboardDatePicker value={searchDate} onChange={handleDate} />;
}
export default JamFilterByDate;
