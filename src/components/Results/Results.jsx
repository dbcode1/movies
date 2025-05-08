import { useState, lazy, Suspense } from "react";
import YouTube from "react-youtube";
import { useEffect } from "react";
const Card = lazy(() => import("../Card/Card.jsx"));
import uniqid from "uniqid";
import { motion } from "framer-motion";
import "./Results.css";
import { textarea } from "framer-motion/client";

// fix scrolling on youtube onclick

const Results = (props) => {
  const [showYouTube, setShowYouTube] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [caption, setCaption] = useState("")
  const [id, setId] = useState("");

  const results = props.resultObjs;

  const nullCheck = results.filter((item) => {
    return item !== null;
  });
  const defined = nullCheck.filter((item) => {
    return typeof item.clip !== "undefined" || typeof item.clip !== null;
  });

  const showYouTubeClass = showYouTube
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";


    const showDescriptionClass = showDescription
      ? "youtube-overlay  display-block"
      : "youtube-overlay display-none";

  const handleId = (id) => {
    console.log(id);
    setId(id);
  };

  const descriptionText = (childData)=>{
    setCaption(childData)
  }

  const getPreview = (e) => {
    e.preventDefault();
    setShowYouTube(true);
  };

  const getDescription = (e, text) => {
    e.preventDefault();
    setCaption(text)
    console.log("description")
    setShowDescription(true);

  };  

  return (
    <>
      <div className="results" key={uniqid()}>
        {/* you tube window */}
        <div className={showYouTubeClass}>
          <YouTube videoId={id} className="youtube" />
          <button
            className="close-youtube"
            onClick={() => setShowYouTube(false)}
          >
            X
          </button>
        </div>
        {/* description window */}
        <div className={showDescriptionClass}>
          <div className="description">
            <button
              className="close-youtube"
              onClick={() => setShowDescription(false)}
            >
              X
            </button>
            {caption}
          </div>
        </div>
        {defined &&
          defined.map((item) => {
            return (
              <>
                <Suspense fallback={<div></div>}>
                  <Card
                    id={uniqid()}
                    item={item}
                    handleId={handleId}
                    descriptionText={descriptionText}
                    getPreview={getPreview}
                    getDescription={getDescription}
                  />
                </Suspense>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Results;
