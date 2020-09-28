import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./assets/css/home.css";
import MainPage from "./StuComponents/mainPage";

class Home extends Component {
  state = {
    studentCode: "",
  };
  imageStyle = {
    width: "35vw",
    minWidth: "300px",
    margin: "0 auto",
  };

  getImage = () => {
    return (
      <div className="container-fluid">
        <img
          className="img-fluid"
          src={require("./assets/image/title.png")}
          alt="this is img"
        />
      </div>
    );
  };

  getHomePage = () => {
    return (
      <div className="home-page">
        <header className="titleheader">
          <h1 className="title">Link Aaya Kya?</h1>
        </header>
        <div className="image" style={this.imageStyle}>
          {this.getImage()}
        </div>
      </div>
    );
  };

  render() {
    const display = this.state.studentCode ? (
      <MainPage studentCode={this.state.studentCode} />
    ) : (
      this.getHomePage()
    );
    return display;
  }
}

export default Home;
