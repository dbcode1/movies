import { useState, lazy, Suspense } from "react";
import YouTube from "react-youtube";
import { useEffect } from "react";
const Card = lazy(() => import("../Card/Card.jsx"));
import uniqid from "uniqid";
import "./Results.css";

// fix scrolling on youtube onclick

const Results = (props) => {
  const [showYouTube, setShowYouTube] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCard, setShowCard] = useState("false");
  const [caption, setCaption] = useState("");
  const [id, setId] = useState("");

  const results = props.resultObjs;
  // toggle show state

  const nullCheck = results.filter((item) => {
    return item !== null;
  });
  const defined = nullCheck.filter((item) => {
    return typeof item.clip !== "undefined" || typeof item.clip !== null;
  });

  //  trigger show class
  useEffect(() => {

    setShowCard(true)
  }, [])

  const showCardClass = showCard ? "card  display-block" : "card display-none";

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

  const descriptionText = (childData) => {
    setCaption(childData);
  };

  const getPreview = (e) => {
    e.preventDefault();
    setShowYouTube(true);
  };

  const getDescription = (e, text) => {
    e.preventDefault();
    setCaption(text);
    console.log("description");
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
             
                  <Card
                    className={showCardClass}
                    id={uniqid()}
                    item={item}
                    handleId={handleId}
                    descriptionText={descriptionText}
                    getPreview={getPreview}
                    getDescription={getDescription}
                  />
                
              </>
            );
          })}
      </div>
    </>
  );
};

export default Results;
