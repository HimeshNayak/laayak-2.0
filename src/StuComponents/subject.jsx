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
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;