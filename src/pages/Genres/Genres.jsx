import "./Genres.css";
import { Suspense, useEffect, useState, useTransition } from "react";
import Results from "../../components/Results/Results.jsx";
import { dataFormatter, getTotal } from "../../utilities.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner.jsx";
import down from "../../assets/down-arrow.svg";
import Select, { components } from "react-select";
import SelectComponent from "../../components/Select/Select.jsx";

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

  /* TODO:
  - get movie id from select component
  */

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

  const handleOnChange = async (movieId, pageNumber) => {
    console.log("PREFETCH");
    queryClient.prefetchQuery({
      queryKey: ["genres", movieId, pageNumber],
      queryFn: () => dataFormatter(movieId, pageNumber),
      staleTime: 3000000,
    });
  };

  const handleOnSelect = async (id, pageNumber) => {
    setMovieId(id);
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
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <SelectComponent
        selectProps={{ handleOnChange, handleOnSelect }}
        onChange={console.log("change")}
      />
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
