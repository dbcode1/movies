import "./Modal.css";
import uniqid from "uniqid";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ setShow, show, children }) => {
  const showClass = show ? "modal display-block" : "modal display-none";

  const closeNav = () => {
    setShow(false);
  };

  return (
    <div className={showClass} onClick={closeNav}>
      <div
        className="modal-main"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onClick={closeNav}>
          X
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
