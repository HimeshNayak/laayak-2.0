import React, { Component } from "react";
import { Link } from "react-router-dom";

class Class extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ margin: 4, height: "100%" }}>
          <div
            className="card shadow-hover my-card-details subject-card"
            style={{ width: "18rem" }}
          >
            <div className="card-body p-0">
              <p className="card-text">
                Course: <strong>{this.props.details.course}</strong>                
                <br />
                Branch: <strong>{this.props.details.branch}</strong>
                <br />
                Semester: <strong>{this.props.details.sem}</strong>
                <br />
                CR : <strong>{this.props.details.crName}</strong>
                <br />
                Subject: <strong>{this.props.subject.name}</strong>
              </p>
            </div>
            <Link
            className="btn btn-success btn-sm"
            to={{
              pathname: "/teacher/class",
              state: {
                classId: this.props.details.classId
              }
            }}
            >More Info</Link>            
          </div>
        </div>
      </div>
    );
  }
}

export default Class;
