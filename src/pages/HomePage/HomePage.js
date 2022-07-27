import React, { useContext, useState, useEffect } from "react";
import MapPage from "../MapPage/MapPage";
import JamListPage from "../JamListPage/JamListPage";
import { Link } from "react-router-dom";
import { JamContext } from "../../context/jams.context";
import "./HomePage.css";
import section1Image from "../../assets/home1.jpeg";
function HomePage() {
  const { allJams } = useContext(JamContext);
  const [jamsForHome, setJamsForHome] = useState(allJams);
  const [searchDate, setSearchDate] = useState(new Date());
  useEffect(() => {
    setJamsForHome(allJams);
  }, [allJams]);
  return (
    <div>
      <section className="section-principal">
        <h1>Jam Sessions</h1>
        <h3>Don't be shy, come to play with us</h3>
        <img src={section1Image} alt="" style={{ opacity: 0.91 }} />
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <a href="#section2">
          <button>Jams</button>
        </a>
      </section>
      <div className="section-jams" id="section2">
        <h2>Our Jams</h2>
        <div className="container-info">
          <JamListPage
            setJamsForHome={setJamsForHome}
            jamsForHome={jamsForHome}
            setSearchDate={setSearchDate}
            searchDate={searchDate}
          />
        </div>
        <MapPage
          setJamsForHome={setJamsForHome}
          jamsForHome={jamsForHome}
          setSearchDate={setSearchDate}
          searchDate={searchDate}
        />
      </div>
    </div>
  );
}

export default HomePage;
