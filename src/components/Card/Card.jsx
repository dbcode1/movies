import { useState } from "react";
import YouTube from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";
import uniqid from "uniqid";
import "./Card.css";

const Card = (props, results, handleId) => {
  const [showModal, setShowModal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showYouTube, setShowYouTube] = useState(false);
  const [caption, setCaption] = useState("")
  const [itemId, setId] = useState("");

  const showClass = showModal
    ? "img-overlay display-block"
    : "img-overlay display-none";

  const showYouTubeClass = showYouTube
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const close = (e) => {
    setShowModal(false);
    setHoveredId(null);
  };
  const open = (id) => {
    setShowModal(true);
    setHoveredId(id);
  };

  const item = props.item;

  return (
    <>
      {typeof item.clip !== "undefined" && item && (
        <div
          className="card"
          onMouseOut={close}
          onMouseOver={() => open(item.id)}
          location={location}
          key={uniqid()}
        >
          {hoveredId === item.id && (
            <>
              <div
                className={showClass}
                key={item.id}
                onMouseOver={() => props.handleId(item.clip)}
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                // transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img
                  // icons eight
                  src="/assets/play.svg"
                  alt="play icon"
                  className="play-icon"
                  onClick={props.getPreview}
                />
                <p
                  className="text-icon" onClick=
                  {(e) => props.getDescription(e, item.overview)}>Description
                </p>
              </div>
            </>
          )}

          <img src={item.img} alt="movie-poster" loading="lazy" />
        
        </div>
      )}
    </>
  );
};
 
export default Card;
