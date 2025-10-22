import { useState, useEffect, memo } from "react";
import YouTube from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";
import uniqid from "uniqid";
import "./Card.css";
import play from "../../assets/play.svg"
import description from "../../assets/description.svg"

const Card = memo((props, results, handleId) => {
  console.log("card mount")
  const [showModal, setShowModal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showYouTube, setShowYouTube] = useState(false);
  const [id, setId] = useState("");

  const cardClass = props.showCard ? "card fade-in-item" : "card fade-out-item";
  
  const showYouTubeClass = showYouTube
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const close = (e) => {
    setShowModal(false);
    setHoveredId(null);
  };

  const item = props.item;

  

  return (
    <>
      {typeof item.clip !== "undefined" && item && (
        <div
          className="card fade-in-item"
          onMouseOut={close}
          location={location}
          key={uniqid()}
        >
          {/* {hoveredId === item.id && ( */}
          {item.id && (
            <>
              <div  className="controls img-overlay" key={item.id} onMouseOver={() => props.handleId(item.clip)}>
                <img
                  // icons eight
                  src={play}
                  alt="play icon"
                  className="play-icon"
                  onClick={props.getPreview}
                />
                <img
                src={description}
                  className="text-icon"
                  onClick={(e) => {
                    props.getDescription(e, item.overview);
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
