import React, { Component } from "react";
import "./main.css";
import "./script";
import { Link } from "react-router-dom";

class MainNavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="fixed-top">
        <div className="hamburger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="brand">
          <img src="./logo.png" alt="LAAYAK" className="logo" />
          <li>LaayaK</li>
        </div>
        <ul className="nav-links">
          <Link to="/" className="nav-link">
            <li>home</li>
          </Link>
          <Link to="/student" className="nav-link">
            <li>student</li>
          </Link>
          <Link to="/cr" className="nav-link">
            <li>class representative</li>
          </Link>
          <Link to="/teacher" className="nav-link">
            <li>teacher</li>
          </Link>
          <Link to="/about" className="nav-link">
            <li>about</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default MainNavBar;
