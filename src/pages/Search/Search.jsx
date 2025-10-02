import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";
import "./Search.css";
import Results from "../../components/Results/Results.jsx";
import { caller, movieObject, preview } from "../../utilities";

// search needs search term from searchbar
// search needs to send data to results
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultObjs, setResultObjs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const clear = () => {
    setResultObjs([]);
  };
  const searchMovies = async (searchTerm) => {
    setResultObjs([]);
    setIsLoaded(false)
    const searchObjs = [];
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&with_videos=true&include_video=true`;
    const data = await caller(url);
    {
      data.results &&
        data.results.length > 0 &&
        data.results.map(async (item, index) => {
          const resultData = await movieObject(item, searchObjs);
          //get rid of broken images
          if (resultData == null) {
            console.log("null");
            return;
          }
          searchObjs.push(resultData);
          const uniqueArray = searchObjs.filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          setResultObjs([resultObjs, ...uniqueArray]);
        });
    }
    setIsLoaded(true)
  };

  return (
    
    <>
      <SearchBar searchMovies={searchMovies} clear={clear} />
      <AnimatePresence>
        <motion.div
          location={location}
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isLoaded && <Results key={uniqid()} resultObjs={resultObjs} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Search;