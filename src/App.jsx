import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Nav from "./components/Nav/Nav.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AnimatePresence } from "framer-motion";
import Search from "./pages/Search/Search.jsx";
import Popular from "./pages/Popular/Popular.jsx";
import Genres from "./pages/Genres/Genres.jsx";
import Modal from "./components/Modal/Modal.jsx";
import menu from "./assets/hamburger.svg";

import film from "./assets/film.svg";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [show, setShow] = useState(false);
  const openNav = () => {
    console.log("open nav");
    setShow(true);
  };

  const closeNav = () => {
    setShow(false);
  };

  const showClass = show ? "modal display-block" : "modal display-none";

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="body">
          <AnimatePresence exit={{ opacity: 0 }} exitBeforeEnter>
            <div className="title-wrapper">
              <button className="menu" onClick={openNav}>
                <img src={menu} alt="menu icon" className="menu-icon" />
              </button>

              <p className="search-title">
                <div className="film-container">
                  <img src={film} className="film-icon" alt="" />
                </div>
                <span className="m">m</span>oving <span className="p">p</span>
                ictures
              </p>
            </div>
            {show && <Modal className={showClass} close={closeNav} show={show}>
              <Nav setShow={setShow}></Nav>
            </Modal>}

            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/popular" element={<Popular />} />
            </Routes>
          </AnimatePresence>
        </div>
      </BrowserRouter>

      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
