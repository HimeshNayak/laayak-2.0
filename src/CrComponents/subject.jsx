import React, { Component } from "react";

class Subject extends Component {
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
              <h5 className="card-title">{this.props.subject.subject}</h5>
              <p className="card-text">
                Subject Code: <strong>{this.props.subject.subjectCode}</strong>
                <br />
                Teacher: <strong>{this.props.subject.teacher}</strong>
              </p>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() =>
                this.props.onDelete(this.props.subject.subjectCode)
              }
            >
              Delete ❌
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;
