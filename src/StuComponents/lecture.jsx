import React, { Component } from "react";
import ShowMoreText from 'react-show-more-text';

class Lecture extends Component {
  state = {};
  render() {
    return (
      this.renderLecture()
    );
  }

  renderLecture = () => {
    const {
      subject,
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
      <div className="container">
        <div className="lec lec-hover" id="lec">
          <div className="lec-preview">
            <div className="time">
              <h3>{startHour} : {startMin} {startAmPm}</h3>
              <div className="mb-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="vertical-line" style={{ height: "20px" }}></span>
                {/* <span className="vertical-line" style={{ height: "45px", margin: "0 1px" }}></span> */}
                {/* <span className="vertical-line" style={{ height: "25px" }}></span> */}
              </div>
              <h3>{endHour} : {endMin} {endAmPm}</h3>
            </div>
            <hr />
            <br />
            <a
              className="lec-btn btn-primary mt-2"
              href={link}
              target="_blank"
              rel="noopener noreferrer" >
              Join now
              </a>
          </div>
          <div className="lec-info text-left">
            <div className="main-data">
              <h2><strong>{subject}</strong></h2>
              <h4>Teacher: {teacher}</h4>
              <h4>Group: {group ? group : "All"}</h4>
            </div>
            <hr />
            <h5><strong>Description: </strong>
              <ShowMoreText
                lines={2}
                more="More"
                less="Less"
                anchorClass=""
                onClick={(e) => document.getElementById("lec").classList.contains("lec-hover") ?
                  document.getElementById("lec").classList.remove("lec-hover") :
                  document.getElementById("lec").classList.add("lec-hover")}
                expanded={false}>
                {text ? text : "No Info Provided"}
              </ShowMoreText>
            </h5>

          </div>
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