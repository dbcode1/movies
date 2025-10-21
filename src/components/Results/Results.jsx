import { useState, memo, useRef, lazy, Suspense } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";

import Modal from "../Modal/Modal.jsx";
import { useEffect } from "react";
const Card = lazy(() => import("../Card/Card.jsx"));
import uniqid from "uniqid";

import "./Results.css";

// fix scrolling on youtube onclick

const Results = memo((props) => {
  console.log("results");
  const [showYouTube, setShowYouTube] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [caption, setCaption] = useState("");
  const [id, setId] = useState("");
  const idRef = useRef("");

  const results = props.resultObjs;
  // toggle show state

  const nullCheck = results.filter((item) => {
    return item !== null;
  });

  const defined = nullCheck.filter((item) => {
    return typeof item.clip !== "undefined" || typeof item.clip !== null;
  });

  // card animation
  // useEffect(() => {
  //   console.log("card appear");
  //   setShowCard(true)
  //   return () => {
  //     setShowCard(false)
  //   };
  // }, [showCard]);

  const showYouTubeClass = showYouTube
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const showDescriptionClass = showDescription
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const handleId = (id) => {
    console.log(id);
    idRef.current = id;
  };

  const descriptionText = (childData) => {
    setCaption(childData);
  };

  const getPreview = (e) => {
    e.preventDefault();
    setShowYouTube(true);
  };

  const getDescription = (e, text) => {
    e.preventDefault();
    console.log("description");
    setShowDescription(true);
    setCaption(text);
  };
  console.log("showcard", showCard);
  return (
    <>
      <div className="results" key={uniqid()}>
        {/* you tube window */}
        <div className={showYouTubeClass}>
          <YouTube videoId={idRef.current} className="youtube"></YouTube>
          <button
            className="close-youtube"
            onClick={() => setShowYouTube(false)}
          >
            X
          </button>
        </div>
        {/* description window */}
          <div className={showDescriptionClass}>
          <button
            className="close-youtube"
            onClick={() => setShowDescription(false)}
          >
            X
          </button>
          <div className="description">
            <p>{caption}</p>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            className="card-animation-container"
            key={uniqid()}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0 }}
          >
            {defined &&
              defined.map((item) => {
                return (
                  <Card
                    key={uniqid()}
                    item={item}
                    handleId={handleId}
                    descriptionText={descriptionText}
                    getPreview={getPreview}
                    getDescription={getDescription}
                  />
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
});

export default Results;
