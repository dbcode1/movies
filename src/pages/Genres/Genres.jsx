import "./Genres.css";
import { useEffect, useState, useTransition } from "react";
import Results from "../../components/Results/Results.jsx";
import { dataFormatter } from "../../utilities.js";

import Spinner from "../../components/Spinner/Spinner.jsx";
import down from "../../assets/down-arrow.svg";

let genreObjs = [];
const Genres = () => {
  const [resultObjs, setResultObjs] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [movieId, setMovieId] = useState(0)

  const handleOnChange = (e) => {
    console.log("page number", pageNumber)
    clear();
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    console.log("optionId", optionId)
    setMovieId(optionId)
    console.log(movieId)
    genre(optionId, pageNumber);
    setGenreId(optionId);
    return optionId
  };

  useEffect(() => {
    
  })
  

  const clear = () => {
    console.log("clear state");
    setResultObjs([]);
  };

  const handleLoad = (e, movieId, pageNumber) => {
   
    setPageNumber((prev) => prev + 1);
    genre(movieId, pageNumber)
    
  };

  const genre = async (id, pageNumber) => {
    clear();
    setIsBusy(true);
    const dataFormatted = await dataFormatter(id, pageNumber);
    console.log(dataFormatted);
    const copy = resultObjs.slice("");
    setResultObjs([copy, ...dataFormatted]);
    setIsBusy(false);
  };

  window.onscroll = function () {
    if (!hasScrolled) {
      if (
        Math.ceil(window.innerHeight + window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        setHasScrolled(true);
        console.log("BOTTOM");
      }
    }
  };

  return (
    <div className="genre">
      <select
        className="selector"
        name="genres"
        id="genres"
        onChange={handleOnChange}
        movieId={movieId}
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
        <>
          <Spinner />
        </>
      ) : (
        <>
          {hasScrolled && (
            <a href="#" onClick={ (e) =>  {handleLoad(e, movieId, pageNumber)} }>
              <img
                // icons eight
                src={down}
                alt="load more results"
                className="load-button"
              />
            </a>
          )}
          <Results searchKey={searchKey} resultObjs={resultObjs} />
        </>
      )}
    </div>
  );
};

export default Genres;
