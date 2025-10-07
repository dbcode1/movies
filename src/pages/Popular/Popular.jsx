import "./Popular.css";
import { useState, useEffect, useRef } from "react";
import { dataFormatter } from "../../utilities.js";
import Results from "../../components/Results/Results.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import down from "../../assets/down-arrow.svg";

const Popular = () => {
  const [resultObjs, setResultObjs] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const loadRef = useRef(null);
  const page = pageNumber;
  console.log("offset", document.documentElement.offsetHeight);

  const popular = async (page) => {
    console.log("popular");
    let data = [];
    console.log(page);
    const popularObjs = [];
    setIsBusy(true);
    const dataFormatted = await dataFormatter(null, pageNumber);
    console.log(dataFormatted);

    const copy = resultObjs.slice("");
    setResultObjs([copy, ...dataFormatted]);
    setIsBusy(false);
  };

  const handleLoad = (movieId) => {
    setPageNumber((prev) => prev + 1);
    console.log("LOAD", pageOffset);
    // window.scrollTo({
    //   top: pageOffset,
    //   left: 0,
    //   behavior: "smooth", // for smooth scrolling
    // });
  };

  //setIsBusy(false)
  useEffect(() => {
    popular(pageNumber, null);
  }, [pageNumber]);

  useEffect(() => {
const handleScroll = () => {
    if (!hasScrolled) {
      if (
        Math.ceil(window.innerHeight + window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        //setPageNumber((prev) => prev + 1);

        setHasScrolled(true);
        console.log("BOTTOM", window.pageYOffset);
        //setPageOffset(window.pageYOffset);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  })
  
  // if (hasScrolled) {
  //   window.removeEventListener("scroll", handleScroll);
  // }

  function isAtBottom() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;

    return scrollTop + clientHeight >= scrollHeight;
  }

  // Function to handle the bottom scroll event
  function handleBottomScroll() {
    if (isAtBottom()) {
      //setHasScrolled(true);
      setPageNumber((prev) => prev + 1);
      console.log("BOTTOM REACHED");
    }
  }

  // Attach the event listener
  // window.addEventListener("scroll", handleBottomScroll);

  return (
    <>
      {isBusy ? (
        <Spinner />
      ) : (
        <>
          {hasScrolled && (
            <a href="#" onClick={handleLoad}>
              <img
                // icons eight
                src={down}
                alt="load more results"
                className="load-button"
              />
            </a>
          )}
          {resultObjs && <Results resultObjs={resultObjs} />}
        </>
      )}
    </>
  );
};

export default Popular;
