import React, { Component } from "react";

class Subject extends Component {
  state = {};
  render() {
    return (
      <div className="up-container flex container mx-auto" style={{ maxWidth: "500px" }}>
        <div className="up">
          <div className="ann-preview">
            <h3><span role="img" className="emoji" aria-label="books">📚</span></h3>
          </div>
          <div className="ann-info text-left">
            <h2><strong>{this.props.subject.subject}</strong></h2>
            <h4>Subject Code: {this.props.subject.subjectCode}</h4>
            <h4>Teacher: {this.props.subject.teacher}</h4>
            <div style={{ position: "absolute", top: "5%", right: "5%" }}>
              <button
                className="btn"
                onClick={() => this.props.onDelete(this.props.subject)}
              >
                <span role="img" aria-label="delete">❌</span>
              </button>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

export default Subject;