import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Search from "./pages/Search/Search.jsx";
import Popular from "./pages/Popular/Popular.jsx";
import Genres from "./pages/Genres/Genres.jsx";
import Modal from "./components/Modal/Modal.jsx";
import menu from "./assets/hamburger.svg"
import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const openNav = () => {
    console.log("open nav");
    setShow(true);
  };

  const showClass = show ? "modal display-block" : "modal display-none";


  return (
    <>
      <BrowserRouter>
        <AnimatePresence exit={{opacity: 0}} exitBeforeEnter>
          <div className="title-wrapper">
            <button className="menu" onClick={openNav}>
              <img
                src={menu}
                alt="menu icon"
                className="menu-icon"
              />
            </button>
            <p className="search-title">
              <span>m</span>oving pictures
            </p>
          </div>

          <Modal className={showClass} setShow={setShow} show={show}>
            <Nav setShow={setShow}></Nav>
          </Modal>

          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/popular" element={<Popular />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}

export default App;
