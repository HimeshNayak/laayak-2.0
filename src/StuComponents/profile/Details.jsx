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
    const { name, email, rollNo, classCode } = this.props.details;
    return (

      <>
        <div className="ann-preview" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img alt="details" src="https://cdn1.iconfinder.com/data/icons/education-set-01/512/document-info-512.png" />
        </div>
        <div className="ann-info text-left">
          <p>
            Name: <strong>{name}</strong>
          </p>
          <p>
            Roll No: <strong>{rollNo}</strong>
          </p>
          <p>
            E-Mail: <strong>{email}</strong>
          </p>
          <p>
            Class Code: <strong>{classCode}</strong>
          </p>          
        </div>
      </>
    );
  };
}

export default Details;
