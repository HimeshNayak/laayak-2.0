import React, { Component } from "react";
import "./bnav.css";

class BottomNav extends Component {
  state = {};
  render() {
    return (
      <nav className="b-nav">
        <ul className="b-nav-links">
          <li>
            <a href="#lectures" className="b-nav-link">
              Lectures
            </a>
          </li>
          <li>
            <a href="#announcements" className="b-nav-link">
              Announcements
            </a>
          </li>
          <li>
            <a href="#subjects" className="b-nav-link">
              Subjects
            </a>
          </li>
          <li>
            <a href="#details" className="b-nav-link">
              Semester
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BottomNav;
