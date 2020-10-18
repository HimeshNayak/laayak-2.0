import React, { Component } from "react";
import firebase from "../firebase";
import Modal from 'react-bootstrap/Modal';

class AddAnnouncement extends Component {
  state = {
    show: false,
    text: "",
    isOfficial: false
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
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title><h3 className="mt-2">Add Announcement Details:</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.callAddAnnouncement}>{this.getForm()}</form>
          </Modal.Body>
        </Modal>
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
        <div className="input-group custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="announcementIsOfficial"
            name="isOfficial"
            onChange={(e) => this.setState({ isOfficial: e.target.checked })}
          />
          <label className="m-2 mb-0 custom-control-label" style={{ fontSize: "18px" }} htmlFor="announcementIsOfficial">
            Official
          </label>
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
      isOfficial: this.state.isOfficial
    };
    this.props.AddAnnouncement(newAnnouncement);
    this.setState({
      text: "",
      isOfficial: false
    });
  };
}

export default AddAnnouncement;
