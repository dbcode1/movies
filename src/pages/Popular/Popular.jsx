import "./Popular.css";
import { useState, useEffect } from "react";
import Results from "../../components/Results/Results.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

import uniqid from "uniqid";
import { motion } from "framer-motion";
import { caller, movieObject, preview } from "../../utilities";
import spinner from "../../assets/spinner.svg";

const Popular = () => {
  const [resultObjs, setResultObjs] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
 

  const popular = async () => {
    let data = [];
    const popularObjs = [];
    for (let i = 1; i <= 2; i++) {
      // if (i > 3) {
      //   setTimeout(() => {}, 1000);
      // }
      const url = `https://api.themoviedb.org/3/discover/movie?&certification_country=US&language=en-US&popularity.gte=100&vote_average.gte=7&vote_count.gte=1000&page=${i}`;
      setIsBusy(true);
      const result = await caller(url);
      data.push(...result.results);
    }
    data.map(async (item) => {
      const resultData = await movieObject(item, popularObjs);
      popularObjs.push(resultData);
      const uniqueArray = popularObjs.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      setResultObjs([...resultObjs, ...uniqueArray]);
    });
    setTimeout(() => {
      setIsBusy(false);
    }, 1000);
    //setIsBusy(false);

    return data;
  };

  useEffect(() => {
    popular();
  }, []);

  return (
    <>
      {isBusy ? (
        <Spinner />
      ) : (
        <>{resultObjs && <Results resultObjs={resultObjs} />}</>
      )}
    </>
  );
};

export default Popular;
