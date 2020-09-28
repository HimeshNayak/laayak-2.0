import React, { Component } from "react";
import firebase from "../firebase";
class AddAnnouncement extends Component {
  state = {
    show: false,

    text: "",
  };

  // toggle show state
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  // modal show/hide class
  showHideClassName = () => (this.state.show ? "" : "d-none");

  styles = {
    position: "fixed",
    background: "pink",
    color: "black",
    width: "80%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  };

  render() {
    return (
      <div>
        <button className="btn-lg btn-info m-1" onClick={this.showModal}>
          Add Announcement
        </button>
        <div className={this.showHideClassName()}>
          <section className="" style={this.styles}>
            <h3 className="mt-2">Add Announcement Details:</h3>
            <form onSubmit={this.callAddAnnouncement}>{this.getForm()}</form>
            <button className="btn-info btn mb-2" onClick={this.hideModal}>
              Close
            </button>
          </section>
        </div>
      </div>
    );
  }

  getForm = () => {
    return (
      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <label className="m-2 mb-0" style={{ fontSize: "18px" }}>
              Announcement:
            </label>
          </div>
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter your main text here..."
            value={this.state.text}
            onChange={this.handleChange}
            name="text"
            required
          />
        </div>
        <button
          className="btn btn-success m-2"
          type="submit"
          onClick={this.hideModal}
        >
          Add
        </button>
      </div>
    );
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  callAddAnnouncement = (e) => {
    e.preventDefault(); // preventing reload
    const newAnnouncement = {
      dateAndTime: firebase.firestore.Timestamp.fromDate(new Date()),
      type: "announcement",
      text: this.state.text,
      isOfficial: true
    };
    this.props.AddAnnouncement(newAnnouncement);
    this.setState({
      text: "",
    });
  };
}

export default AddAnnouncement;
