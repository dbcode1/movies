import React, { useState, useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Nav.css";

const Nav = ({ setShow, show }) => {
  function Item({ name, path }) {
    return (
      <NavLink
        onClick={() => setShow(false)}
        className={({ isActive, isPending }) =>
          isPending ? "link pending" : isActive ? "link active" : ""
        }
        to={path}
        viewTransition
      >
        {name}
      </NavLink>
    );
  }
  // render nav based on route
  let location = useLocation();
  const home = location.pathname == "/";

  return (
    <div className="nav">
      <li>
        <Item className="nav-link" name="Search" path="/">
          ITEM
        </Item>
      </li>
      <li>
        <Item name="Genres" path="/genres" viewTransition>
          ITEM
        </Item>
      </li>
      <li>
        <Item name="Popular" path="/popular" viewTransition></Item>
      </li>
    </div>
  );
};

export default Nav;
