import "./Genres.css";
import { Suspense, useEffect, useState, useTransition } from "react";
import Results from "../../components/Results/Results.jsx";
import { dataFormatter, getTotal } from "../../utilities.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner.jsx";
import down from "../../assets/down-arrow.svg";

let genreObjs = [];
const Genres = () => {
  // set show card false
  const [resultObjs, setResultObjs] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [movieId, setMovieId] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const queryClient = useQueryClient();

  useEffect(() => {
    const getTotalValue = async () => {
      const total = await getTotal(movieId, pageNumber);
      console.log(total);
      const nextPage = pageNumber + 1;
      if (pageNumber < total) {
        console.log("PREFETCH");
        queryClient.prefetchQuery({
          queryKey: ["genres", movieId, nextPage],
          queryFn: () => dataFormatter(movieId, nextPage),
        });
      }
    };
    getTotalValue();
  }, [movieId, pageNumber, queryClient]);

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["genres", movieId, pageNumber],
    queryFn: () => dataFormatter(movieId, pageNumber),
    staleTime: 2000,
  });

  const handleOnChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    setMovieId(optionId);
    setGenreId(optionId);
    return optionId;
  };

  const handleLoad = (e, movieId, pageNumber) => {
    setPageNumber((prev) => prev + 1);
  };

  window.onscroll = function () {
    if (
      Math.ceil(window.innerHeight + window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  if (error) {
    return ( <div className="error">{error}</div>)
  }
  return (
    <div className="genre">
      <select
        className="selector"
        name="genres"
        id="genres"
        onChange={handleOnChange}
        movieId={movieId}
      >
        <option >Genre</option>
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

      <>
        {hasScrolled && (
          <a
            href="#"
            onClick={(e) => {
              handleLoad(e, movieId, pageNumber);
            }}
          >
            <img
              // icons eight
              src={down}
              alt="load more results"
              className="load-button"
            />
          </a>
        )}

        {data && !isLoading && (
          <Results
            isLoading={isLoading}
            searchKey={searchKey}
            resultObjs={data}
          />
        )}
      </>
    </div>
  );
};

export default Genres;
