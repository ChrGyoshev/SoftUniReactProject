import { Route, Routes, Link } from "react-router-dom";

import { useRef, useState } from "react";
import { HideNavBar } from "../assets/js/HideNavbar";
const NavBar = () => {
  return (
    <>
      <nav>
        <div className="allMenu ">
          <ul className="ul">
            <Link to="/">
              <li className="lia">
                <span className="li">Home</span>
              </li>
            </Link>

            <li className="lia">
              <a className="li">Catalogue</a>
            </li>

            <Link to="/sign-up">
              <li className="lia">
                <span className="li">Sign Up</span>
              </li>
            </Link>

            <Link to="/sign-in">
              <li className="lia">
                <span className="li">Sign In</span>
              </li>
            </Link>

            <Link to="/about">
              <li className="lia">
                <span className="li">About</span>
              </li>
            </Link>
          </ul>
          <div className="Menu2">
            <svg
              version="1.1"
              id="menulogo"
              x="0px"
              y="0px"
              width="40px"
              height="36px"
              viewBox="0 0 40 36"
              onClick={HideNavBar}
            >
              <rect
                className="rect1"
                fill="#FFF"
                width="40"
                height="5.392"
              ></rect>
              <rect
                className="rect2"
                x="0"
                y="12"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
              <rect
                className="rect3"
                x="0"
                y="24"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
            </svg>
            <div className="Menu hover"></div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
