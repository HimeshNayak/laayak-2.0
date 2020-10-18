import React, { Component } from "react";
import "./bnav.css";

class BottomNav extends Component {
  state = {};    
  render() {
    return (
      <nav className="b-nav">
        <ul className="b-nav-links">
          {this.props.paths.map((path) => (
            <li key={path}>
            <a href={"#"+path} className="b-nav-link">
              {path}
            </a>
          </li>
          ))}          
        </ul>
      </nav>
    );
  }
}

export default BottomNav;
