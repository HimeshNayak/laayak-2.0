import React, { Component } from "react";

class Details extends Component {
  state = {};
  render() {
    return (
      <div
        className="my-card-details shadow-hover p-2"
        style={{ width: "18rem" }}
      >
        {this.getDetails()}
      </div>
    );
  }
  getDetails = () => {
    const { name, college } = this.props.details;
    return (
      <div>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <p>
          College: <strong>{college}</strong>
        </p>        
      </div>
    );
  };
}

export default Details;
