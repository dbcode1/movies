import React, { useRef, useState } from "react";
import YouTube from "react-youtube";
import Modal from "../Modal/Modal.jsx";

export const CardModal = (props) => {
  const showYouTubeClass = props.showYouTube
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const showDescriptionClass = props.showDescription
    ? "youtube-overlay  display-block"
    : "youtube-overlay display-none";

  const descriptionText = (childData) => {
    console.log("get description", childData);
    setCaption(childData);
  };

  return (
    <>
      <div className={showYouTubeClass}>
        <button className="close" onClick={() => props.setShowYouTube(false)}>
          X
        </button>
        <YouTube videoId={props.ref} className="youtube"></YouTube>
      </div>
      <div className={showDescriptionClass}>
        <button
          className="close"
          onClick={() => props.setShowDescription(false)}
        >
          X
        </button>
        <div className="description">
          <p>{props.caption}</p>
        </div>
      </div>
    </>
  );
};
