import { useState, useEffect, memo, useRef } from "react";
import YouTube from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";
import uniqid from "uniqid";
import "./Card.css";
import play from "../../assets/play.svg"
import description from "../../assets/description.svg"
import { CardModal } from "../CardModal/CardModal";

const Card = memo((props, results) => {
  const [showYouTube, setShowYouTube] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const idRef = useRef("");

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

  const handleId = (id) => {
    console.log(id);
    idRef.current = id;
  };

  const item = props.item;

  return (
    <>
      {typeof item.clip !== "undefined" && item && (
        <div
          className="card"
          onMouseOut={close}
          location={location}
          key={uniqid()}
        >
          {/* {hoveredId === item.id && ( */}
          {item.id && (
            <>
              <CardModal
                setShowDescription={setShowDescription}
                setShowYouTube={setShowYouTube}
                showYouTube={showYouTube}
                showDescription={showDescription}
                ref={idRef.current}
                caption={item.overview}
              ></CardModal>
              <div
                className="controls img-overlay"
                key={item.id}
                onMouseOver={() => handleId(item.clip)}
              >
                <img
                  // icons eight
                  src={play}
                  alt="play icon"
                  className="play-icon"
                  onClick={getPreview}
                />
                <img
                  src={description}
                  className="text-icon"
                  onClick={(e) => {
                    getDescription(e, item.overview);
                  }}
                />
              </div>
            </>
          )}

          <img src={item.img} alt="movie-poster" />
        </div>
      )}
    </>
  );
})

export default Card;
