import "./Popular.css";
import { useState, useEffect, useRef } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

import { dataFormatter, getPopularTotal } from "../../utilities.js";
import Results from "../../components/Results/Results.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import down from "../../assets/down-arrow.svg";

const Popular = () => {
  const [resultObjs, setResultObjs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const loadRef = useRef(null);

  // tanstack
  const queryClient = useQueryClient();

  useEffect(() => {
    const getTotalValue = async () => {
      const total = await getPopularTotal(pageNumber);
      console.log("TOTAL===========", pageNumber);
      const nextPage = pageNumber + 1;
      if (pageNumber < total) {
        console.log("PREFETCH");
        queryClient.prefetchQuery({
          queryKey: ["popular", nextPage],
          queryFn: () => dataFormatter(nextPage),
        });
      }
    };
    getTotalValue();
  }, [pageNumber, queryClient]);

  const { data, refetch, isPending, isLoading, isFetching, error } = useQuery({
    queryKey: ["popular", pageNumber],
    queryFn: () => dataFormatter(null, pageNumber),
    staleTime: 2000,
  });

  if (data) console.log("DATA", data);

  const popular = async (page) => {
    console.log("popular");
    let data = [];
    console.log(page);
    const popularObjs = [];
    const dataFormatted = await dataFormatter(null, pageNumber);
    console.log(dataFormatted);

    const copy = resultObjs.slice("");
    setResultObjs([copy, ...dataFormatted]);
  };

  const handleLoad = (movieId) => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        if (
          Math.ceil(window.innerHeight + window.pageYOffset) >=
          document.body.offsetHeight
        ) {
          //setPageNumber((prev) => prev + 1);

          setHasScrolled(true);
          //setPageOffset(window.pageYOffset);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
  });

  

  // if (isLoading) return <Spinner />;
  if (error) {
    console.log(error)
    return <div className="error">{error}</div>;
  }
  !data ? null : console.log(data);

  return (
    <>
      {hasScrolled && !isLoading && (
        <a href="#" onClick={handleLoad}>
          <img
            // icons eight
            src={down}
            alt="load more results"
            className="load-button"
          />
        </a>
      )}

      {!isLoading && <Results resultObjs={data} />}
    </>
  );
};

export default Popular;
