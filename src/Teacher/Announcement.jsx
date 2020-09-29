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
      <div className={this.getClass()} style={{ position: "relative" }}>
        {this.displayUpdate()}
        <div style={{ position: "absolute", top: "5%", right: "1%" }}>
          {this.createButtons()}
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
      default :
      return ;
    }
  };

  displayAnnouncement = () => {
    const { dateAndTime, text } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let ampm = "am";
    if (hour > 12) {
      hour -= 12;
      ampm = "pm ";
    }
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));
    return (
      <div>
        <p>
          Posted On:{" "}
          <strong>
            {month} {date}, {year}
          </strong>{" "}
          at{" "}
          <strong>
            {hour}: {min}
            {ampm}
          </strong>
        </p>
        <p>
          Announcement: <strong>{text}</strong>
        </p>
      </div>
    );
  };

  displayLink = () => {
    const { dateAndTime, text, link } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let ampm = "am";
    if (hour > 12) {
      hour -= 12;
      ampm = "pm ";
    }
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));

    return (
      <div>
        <p>
          Posted On:{" "}
          <strong>
            {month} {date}, {year}
          </strong>{" "}
          at{" "}
          <strong>
            {hour}: {min}
            {ampm}
          </strong>
        </p>
        <p>
          Link:{" "}
          <span className="alert-link">
            <strong>{link}</strong>
          </span>
        </p>
        <p>
          About this Link: <strong>{text}</strong>
        </p>
        <a
          href={link}
          className="btn btn-sm btn-danger mb-2"
          target="about_blank"
        >
          Go to Link
        </a>
      </div>
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
    } = this.props.announcement;
    let dateTime = dateAndTime.toDate();
    const date = dateTime.getDate();

    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    let hour = dateTime.getHours();
    let ampm = "am";
    if (hour > 12) {
      hour -= 12;
      ampm = "pm ";
    }
    let min = "00",
      mins = dateTime.getMinutes();
    mins < 10 ? (min = "0" + String(mins)) : (min = String(mins));
    let yesVotePercent = (yesCount * 100) / (noCount + yesCount);
    if (Number.isNaN(yesVotePercent)) yesVotePercent = 0;
    let noVotePercent = (noCount * 100) / (noCount + yesCount);
    if (Number.isNaN(noVotePercent)) noVotePercent = 0;
    return (
      <div>
        <p>
          Posted On:{" "}
          <strong>
            {month} {date}, {year}
          </strong>{" "}
          at{" "}
          <strong>
            {hour}: {min}
            {ampm}
          </strong>
        </p>
        <p>
          Poll: <strong>{text}</strong>
        </p>

        <div className="row">
          <div className="col-md-6">
            <table className="table">
              <tbody>
              <tr>
                <td>Option</td>
                <td>{yesOption}</td>
              </tr>
              <tr>
                <td>Votes</td>
                <td>{yesCount}</td>
              </tr>
              <tr>
                <td>Percentage</td>
                <td> {yesVotePercent.toFixed(2)}% </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table">
            <tbody>
              <tr>
                <td>Option</td>
                <td>{noOption}</td>
              </tr>
              <tr>
                <td>Votes</td>
                <td>{noCount}</td>
              </tr>
              <tr>
                <td>Percentage</td>
                <td> {noVotePercent.toFixed(2)}% </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  getClass = () => {
    const { type } = this.props.announcement;
    let cls = "text-left p-2 mb-4 ";
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
        return ;
    }
    return cls;
  };

  createButtons = () => {
    return (
      <button
        className="btn btn-danger btn-sm m-1"
        onClick={() => this.props.onDelete(this.props.announcement.dateAndTime)}
      >
        Delete
      </button>
    );
  };
}

export default Announcement;

// type: announcement , polls, links
