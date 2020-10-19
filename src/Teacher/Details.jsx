import React, { Component } from "react";

class Details extends Component {
  state = {};
  render() {
    return (
      <div className="up-container d-flex flex-column container-fluid">
        <div className="up mx-auto">
          {this.getDetails()}
        </div>
      </div>
    );
  }
  getDetails = () => {
    const { name, college } = this.props.details;
    return (
      <>
        <div className="ann-preview" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <h3><span role="img" className="emoji" aria-label="announcement">👨🏻‍🏫</span></h3>
        </div>
        <div className="ann-info text-left my-auto">
        <h3>
          Name: <strong>{name}</strong>
        </h3>
        <h3>
          College: <strong>{college}</strong>
        </h3>
        </div>
      </>          
    );
  };
}

export default Details;
