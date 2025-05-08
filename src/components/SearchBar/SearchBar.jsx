import { useState } from "react";
import Results from "../Results/Results";
import "./SearchBar.css";

function SearchBar({ searchMovies, clear }) {
  const [searchTerm, setSearchTerm] = useState("");

  const search = (e) => {
    console.log("search");
    e.preventDefault();
    searchMovies(e.target.elements[0].value);
    e.target.elements[0].value = "";
  };
  console.log(searchTerm);
  return (
    <div className="searchbar">
      <form onSubmit={search} className="form">
        <input
          type="text"
          className="searchterm"
          placeholder="Movie Title"
          onFocus={clear}
        ></input>
        <input type="submit" className="submit"></input>
      </form>
    </div>
  );
}

export default SearchBar;
