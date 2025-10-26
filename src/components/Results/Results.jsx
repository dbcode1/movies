import { useState, memo, useRef, lazy} from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";

import Modal from "../Modal/Modal.jsx";
import { useEffect } from "react";
const Card = lazy(() => import("../Card/Card.jsx"));
import uniqid from "uniqid";

import "./Results.css";
import { CardModal } from "../CardModal/CardModal.jsx";

// fix scrolling on youtube onclick

const Results = memo((props) => {
  const results = props.resultObjs;

  const nullCheck = results.filter((item) => {
    return item !== null;
  });

  const defined = nullCheck.filter((item) => {
    return typeof item.clip !== "undefined" || typeof item.clip !== null;
  });

  const transition = {
  duration: 0.8,
  delay: 0.5, // this is what ive been looking for
  ease: [0, 0.71, 0.2, 1.01],
}

  return (
    <>
      <div className="results" key={uniqid()}>
        <AnimatePresence>
          <motion.div
            className="card-animation-container"
            key={uniqid()}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            {defined &&
              defined.map((item) => {
                return (
                  <Card
                    key={uniqid()}
                    item={item}
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
