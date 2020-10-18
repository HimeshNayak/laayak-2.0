import React, { Component } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class Announcement extends Component {
  state = {};

  render() {
    return (
      <div className="up-container d-flex flex-column container-fluid">
        <div className="up mx-auto">
          {this.displayUpdate()}
        </div>
      </div>
    );
  }

  displayUpdate = () => {
    const { type } = this.props.announcement;
    switch (type) {
      case "announcement":
        return this.displayAnnouncement();
      case "poll":
        return this.displayPoll();
      case "link":
        return this.displayLink();
      default:
        return;
    }
  };

  displayAnnouncement = () => {
    const { dateAndTime, text, isOfficial } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth() - 1];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));
    return (
      <>
        <div className="ann-preview">
          {isOfficial && <i className="fa fa-bookmark float-right mr-n4 mt-n4 text-danger" style={{ fontSize: "30px" }}></i>}
          <h3><span role="img" className="emoji" aria-label="announcement">📢</span></h3>
        </div>
        <div className="ann-info text-left">
        <h6 style={{ width: "fit-content" }} className="mb-3">{month} {date}, {year} at {hour}:{min}</h6>
          <div style={{ minHeight: "50%", display: "flex", alignItems: "center" }}>
            <h4>{text}</h4>
          </div>
          <div style={{ position: "absolute", top: "5%", right: "1%" }}>
            {this.createButtons()}
          </div>
        </div>
      </>
    );
  };

  displayLink = () => {
    const { dateAndTime, text, link, isOfficial } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth() - 1];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));

    return (
      <>
        <div className="ann-preview">
          {isOfficial && <i className="fa fa-bookmark float-right mr-n4 mt-n4 text-danger" style={{ fontSize: "30px" }}></i>}
          <h3><span role="img" className="emoji" aria-label="announcement">🔗</span></h3>
        </div>
        <div className="ann-info text-left">
          <h6 style={{ width: "fit-content" }} className="mb-3">{month} {date}, {year} at {hour}:{min}</h6>
          <h4>{text}</h4>
          <a
            className="btn link-btn btn-primary mt-2 float-right"
            href={link}
            target="_blank"
            rel="noopener noreferrer" >
            Visit Link
              </a>
          <div style={{ position: "absolute", top: "5%", right: "1%" }}>
            {this.createButtons()}
          </div>
        </div>
      </>
    );
  };

  displayPoll = () => {
    const {
      dateAndTime,
      text,
      yesCount,
      yesOption,
      noCount,
      noOption,
      isOfficial
    } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth() - 1];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));
    let yesVotePercent = (yesCount * 100) / (noCount + yesCount);
    if (Number.isNaN(yesVotePercent)) yesVotePercent = 0;
    let noVotePercent = (noCount * 100) / (noCount + yesCount);
    if (Number.isNaN(noVotePercent)) noVotePercent = 0;
    return (
      <>
        <div className="ann-preview">
          {isOfficial && <i className="fa fa-bookmark float-right mr-n4 mt-n4 text-danger" style={{ fontSize: "30px" }}></i>}
          <h3><span role="img" className="emoji" aria-label="announcement">🗳️</span></h3>
        </div>
        <div className="ann-info text-left">
        <h6 style={{ width: "fit-content" }} className="mb-3">{month} {date}, {year} at {hour}:{min}</h6>
          <h4>{text}</h4>
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>{yesOption}</td>
                    <td>{noOption}</td>
                  </tr>
                  <tr>
                    <td>{yesCount}</td>
                    <td>{noCount}</td>
                  </tr>
                  {/* <tr>
                    <td> {yesVotePercent.toFixed(2)}% </td>
                    <td> {noVotePercent.toFixed(2)}% </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ position: "absolute", top: "5%", right: "1%" }}>
            {this.createButtons()}
          </div>
        </div>
      </>
    );
  };

  getClass = () => {
    const { type } = this.props.announcement;
    let cls = "text-left p-4 mb-4 ";
    switch (type) {
      case "announcement":
        cls = cls + "announcement-card ";
        break;
      case "poll":
        cls = cls + "poll-card";
        break;
      case "link":
        cls = cls + "link-card";
        break;
      default:
        return;
    }
    return cls;
  };

  createButtons = () => {
    return (
      <button
        className="btn"
        onClick={() => this.props.onDelete(this.props.announcement.dateAndTime)}
      >
        <span role="img" aria-label="delete">❌</span>
      </button>
    );
  };
}

export default Announcement;

// type: announcement , polls, links
