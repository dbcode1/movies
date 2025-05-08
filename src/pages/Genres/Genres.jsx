import "./Genres.css";
import { useEffect, useState } from "react";
import Results from "../../components/Results/Results.jsx";
import { motion } from "framer-motion";
import { caller, movieObject, preview } from "../../utilities.js";


const Genres = () => {
  const intialResults = [];
  const [resultObjs, setResultObjs] = useState(intialResults);
  const [genreId, setGenreId] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const genreObjs = [];

 
  const handleOnChange = (e) => {
    clear();
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    genre(optionId);
    setGenreId(optionId);
  };

  const clear = () => {
    console.log("clear state");
    setResultObjs([]);
  };
  const genre = async (id) => {
    setIsBusy(true);
    let data = [];
    let urls = [];
    setSearchKey((prevKey) => prevKey + 1);
    // get page urls
    for (let i = 1; i < 24; i++) {
      // if (i > 4) {
      //   setTimeout(() => {}, 1000);
      // }

      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${i}`;
      // const result = await caller(url);
      // data.push(...result.results);
      urls.push(url);
    }
    
    try {
      const requests = urls.map((url) => caller(url));
      const responses = await Promise.all(requests);
      responses.map((item) => {
        data.push(item.results);
      });

      // console.log("All requests finished", movies);
    } catch {
      console.log("Error fetching data");
    }

    data.flat().forEach(async (item) => {
      const resultData = await movieObject(item);
      genreObjs.push(resultData);

      const uniqueArray = genreObjs.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      const copy = resultObjs.slice("");
      setResultObjs([copy, ...uniqueArray]);
    });

    //setIsBusy(false);

    setTimeout(() => {
      setIsBusy(false);
    }, 800);
  };

  return (
    <div className="genre">
      <select
        className="selector"
        name="genres"
        id="genres"
        onChange={handleOnChange}
      >
        <option selected="selected">Genre</option>
        <option id="28" value="action">
          Action
        </option>
        <option id="12" value="adventure">
          Adventure
        </option>
        <option id="16" value="animation">
          Animation
        </option>
        <option id="35" value="comedy">
          Comedy
        </option>
        <option id="80" value="crime">
          Crime
        </option>
        <option id="99" value="documentary">
          Documentary
        </option>
        <option id="18" value="drama">
          Drama
        </option>
        <option id="10751" value="family">
          Family
        </option>
        <option id="14" value="fantasy">
          Fantasy
        </option>
        <option id="36" value="history">
          History
        </option>
        <option id="27" value="horror">
          Horror
        </option>
        <option id="10402" value="music">
          Music
        </option>
        <option id="9648" value="mystery">
          Mystery
        </option>
        <option id="10749" value="romance">
          Romance
        </option>
        <option id="878" value="science fiction">
          Science Fiction
        </option>
        <option id="53" value="thriller">
          Thriller
        </option>
        <option id="10752" value="war">
          war
        </option>
        <option id="37" value="western">
          western
        </option>
      </select>

      {isBusy ? (
        <></>
      ) : (
        <motion.div
          location={location}
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Results searchKey={searchKey} resultObjs={resultObjs} />
        </motion.div>
      )}
    </div>
  );
};

export default Genres;
