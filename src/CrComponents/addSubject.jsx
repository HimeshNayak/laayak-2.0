import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import firebase from "../firebase";

// reference to firestore

let db = firebase.firestore();

class AddSubject extends Component {
  state = {
    show: false,
    subject: "",
    code: "",
    teacherId: "",
    teacherName: "",
    disabled: false    
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
    display: "block",
    background: "pink",
    color: "black",
    width: "60%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  };

  render() {
    return (
      <div>
        <button className="btn btn-info btn-lg mb-4" onClick={this.showModal}>
          New Subject +
        </button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title><h3 className="mt-2">Add Subject Details:</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={this.callAddSubject}>{this.getForm()}</form>
          </Modal.Body>
        </Modal>        
      </div>
    );
  }

  getForm = () => {
    return (
      <div className="">
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Teacher Id:</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="teacher-id"
              name="teacherId"              
              value={this.state.teacherId}
              onChange={this.fetchTeacher}
            />
          </div>
        </div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Teacher Name:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="teacher-name"
              name="teacherName"
              disabled={this.state.disabled}
              value={this.state.teacherName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Subject Code:</label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="code"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
            />
          </div>
        <label className="col-sm-2 col-form-label">Subject Name:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="name"
              name="subject"
              value={this.state.subject}
              onChange={this.handleChange}
            />
          </div>          
        </div>
        <button className="btn btn-success m-2">Add</button>
      </div>
    );
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  fetchTeacher = (event) => {
    this.handleChange(event)
    let id = event.target.value;
    if(id){
    db.collection("teachers").doc(id).onSnapshot((doc) => {    
      if(doc.exists){
        this.setState({teacherName: doc.data().details["name"], subjects: doc.data().subjects, disabled: true});
      } else {
        this.setState({ teacherName: "", subjects: [], disabled: false })
      }      
    })
  }
  }

  callAddSubject = (e) => {
    e.preventDefault(); // preventing reload
    const subj = {
      subject: this.state.subject,
      subjectCode: this.state.code,
      teacher: this.state.teacherName,
      teacherId: this.state.teacherId
    };
    this.setState({ show: false });    
    this.props.addSubject(subj);
    this.setState({
      subject: "",
      code: "",
      teacherName: "",
      teacherId: "",
      disabled: false
    });
  };
}

export default AddSubject;
