import React, { Component } from "react";
import { Link } from "react-router-dom";

class Class extends Component {
  state = {};
  render() {
    return (
      <div className="up-container d-flex flex-column container-fluid">
        <div className="up mx-auto">
          <div className="ann-preview">    
            <ul>
              {this.props.class.subjects.map((sub) => (
                <h4 key={sub.code}><li>{sub.name}</li></h4>
              ))}
            </ul>    
          </div>
          <div className="ann-info text-left"> 
            <h4><strong>Course: </strong>{this.props.class.details.course}</h4>
            <h4><strong>Branch: </strong>{this.props.class.details.branch}</h4>
            <h4><strong>Semester: </strong>{this.props.class.details.sem}</h4>
            <h4><strong>CR: </strong>{this.props.class.details.crName}</h4>
            <Link
            className="btn link-btn btn-primary mt-2 float-right"
            to={{
              pathname: "/teacher/class",
              state: {
                classId: this.props.class.details.classId
              }
            }} > More Info </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Class;