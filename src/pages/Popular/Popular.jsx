import "./Popular.css";
import { useState, useEffect } from "react";
import { dataFormatter } from "../../utilities.js"
import Results from "../../components/Results/Results.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

const Popular = () => {
  const [resultObjs, setResultObjs] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const popular = async () => {
    let data = [];
    const popularObjs = [];
     setIsBusy(true)
    const dataFormatted = await dataFormatter()
    console.log(dataFormatted)

    const copy = resultObjs.slice("");
    setResultObjs([copy, ...dataFormatted]);
    setIsBusy(false);

  };
  //setIsBusy(false)
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
