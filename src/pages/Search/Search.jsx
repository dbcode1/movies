import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";
import "./Search.css";
import Results from "../../components/Results/Results.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { caller, movieObject, preview } from "../../utilities";

// search needs search term from searchbar
// search needs to send data to results
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultObjs, setResultObjs] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const location = useLocation();
  const clear = () => {
    setResultObjs([]);
  };
  const searchMovies = async (searchTerm) => {
    setResultObjs([]);
    setIsBusy(true);
    const searchObjs = [];
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&with_videos=true&include_video=true`;

    let results = [];
    try {
      const data = await caller(url);
      console.log(data.results);
      data.results.map((item) => {
        results.push(item);
      });
    } catch {
      console.log("Error fetching data");
    }

    const movieObjs = results.map(async (item) => {
      const result = await movieObject(item);
      return result;
    });

    const m = await Promise.all(movieObjs);
    console.log(m);
    const unique = m.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const copy = resultObjs.slice("");
    setResultObjs([copy, ...unique]);
    setIsBusy(false);
  };
  console.log(resultObjs);
  return (
    <>
      <SearchBar className="searchbar"searchMovies={searchMovies} clear={clear} />
      <AnimatePresence>
        <motion.div
          location={location}
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isBusy ? (
            <>
              <Spinner />
            </>
          ) : (
            <Results resultObjs={resultObjs} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Search;
