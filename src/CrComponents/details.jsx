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
    const { branch, college, course, sem, crName } = this.props.details;
    return (
      <div>
        <p>
          Branch: <strong>{branch}</strong>
        </p>
        <p>
          College: <strong>{college}</strong>
        </p>
        <p>
          Course: <strong>{course}</strong>
        </p>
        <p>
          Semester: <strong>{sem}</strong>
        </p>
        <p>
          Class Representative: <strong>{crName}</strong>
        </p>
      </div>
    );
  };
}

export default Details;
