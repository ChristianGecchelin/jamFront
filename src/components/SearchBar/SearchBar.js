import { useRef, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import SearchResults from "../SearchResults/SearchResults";
import "./SearchBar.css";

const SearchBar = () => {
  const debounceRef = useRef();
  const { searchPlacesByTerm } = useContext(AuthContext);

  const onQueryChange = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(e.target.value);
    }, 500);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar place..."
        onChange={onQueryChange}/* 
        style={{
          position:'fixed',
          top:150,
          zIndex: 50,
        width:'300px' }
        } */
      />
      <SearchResults />
    </div>
  );
};

export default SearchBar;
