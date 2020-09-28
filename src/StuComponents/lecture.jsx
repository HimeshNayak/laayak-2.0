import React, { Component } from "react";

class Lecture extends Component {
  state = {};
  render() {
    return (
      <div
        className="lec-card shadow-hover my-card-details p-2"
        style={{ minWidth: "18rem", marginRight: "30px" }}
      >
        {this.renderLecture()}
      </div>
    );
  }

  renderLecture = () => {
    const {
      subject,
      subjectCode,
      teacher,
      startTime,
      endTime,
      link,
      text,
      group,
    } = this.props.lecture;

    let startHour = startTime.toDate().getHours(),
      startMins = startTime.toDate().getMinutes(),
      startAmPm = "am";
    if (startHour > 12) {
      startHour = startHour - 12;
      startAmPm = "pm";
    }    
    
    let startMin = (startMins < 10) ? ("0" + String(startMins)) : String(startMins);
    let endHour = endTime.toDate().getHours(),
      endMins = endTime.toDate().getMinutes(),
      endAmPm = "am";

    if (endHour > 12) {
      endHour = endHour - 12;
      endAmPm = "pm";
    }
    let endMin = endMins < 10 ? ("0" + String(endMins)) : String(endMins);

    return (
      <div>
        <p>
          Subject: <strong>{subject}</strong>
        </p>
        <p>
          Subject Code: <strong>{subjectCode}</strong>
        </p>
        <p>
          Teacher: <strong>{teacher}</strong>
        </p>

        <p>
          Timings:{" "}
          <strong>
            {startHour} : {startMin} {startAmPm} to {endHour} : {endMin}{" "}
            {endAmPm}
          </strong>
        </p>
        <p>
          Group: <strong>{group ? group : "All"}</strong>
        </p>
        <p className="mb-0">
          Description: <strong>{text}</strong>
        </p>
        <br />
        <div className="btn-lec">
          <a
            href={link}
            className="btn btn-primary mt-0 join-copy"
            target="_blank"
          >
            Join now
          </a>
          <button
            className="btn btn-success mt-0 join-copy"
            onClick={this.copyLink}
          >
            Copy Link
          </button>
        </div>
      </div>
    );
  };

  copyLink = (e) => {
    const { link } = this.props.lecture;
    const el = document.createElement("textarea");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("link copied!");
  };
}

export default Lecture;
