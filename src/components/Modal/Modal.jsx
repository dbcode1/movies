import "./Modal.css";
import { memo } from "react"


const Modal = memo(({ setShow, show, close, children }) => {
  const showClass = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showClass} onClick={close}>
      <div
        className="modal-main"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onClick={close}>
          X
        </button>
        
        {children}
      </div>
    </div>
  );
})

export default Modal;
