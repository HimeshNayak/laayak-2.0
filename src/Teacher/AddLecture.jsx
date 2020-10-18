import React, { Component } from "react";
import firebase from "../firebase";
import Modal from 'react-bootstrap/Modal';

class AddLecture extends Component {
  isMount = false;
  state = {
    show: false,
    link: "",
    branch: "",
    semester: "",
    subjectName: "",
    subjectCode: "",
    classId: "",
    text: "",
    group: "",
  };

  // toggle show state
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  // modal show/hide class
  // showHideClassName = () => (this.state.show ? "" : "d-none");

  // styles = {
  //   position: "fixed",
  //   display: "block",
  //   background: "pink",
  //   color: "black",
  //   width: "80%",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%,-50%)",
  //   zIndex: 1,
  //   boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  // };

  render() {
    return (
      <div>
        <button className="btn-info btn-lg mb-4" onClick={this.showModal}>
          Add Lecture +
        </button>        
        <Modal        
        show={this.state.show} 
        onHide={this.hideModal}
        dialogClassName="modal-dialog-scrollable modal-lg"
        >
        <Modal.Header closeButton>
          <Modal.Title><h3>Add Lecture Details:</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.getForm()}
        </Modal.Body>        
      </Modal>
      </div>
    );
  }

  getForm = () => {
    return (
      <div>
        <form className="m-2" onSubmit={this.callAddLecture}>          
          <div className="col-sm-7" style={{ margin: "auto" }}>
            <label>Branch: </label>
            <select
              className="add-lec-subject form-control text-center"
              name="branch"
              onChange={this.handleChange}
              required
            >
              <option className="add-lec-opns" value="">
                --Choose Branch---
              </option>              
              {this.props.classesTeaching.map((classTeaching) => {
                return (
                  <option className="add-lec-opns" key={classTeaching.details.classId+classTeaching.details.subject} value={classTeaching.details.branch}>
                    {classTeaching.details.branch}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-7" style={{ margin: "auto" }}>
            <label>Semester: </label>
            <select
              className="add-lec-subject form-control text-center"
              name="semester"
              onChange={this.handleSemChange}
              required
            >
              <option className="add-lec-opns" value="">
                --Choose Semester---
              </option>
              {this.props.classesTeaching.filter((classTeaching) => (classTeaching.details.branch === this.state.branch)).map((classTeaching) => {
                return (
                  <option className="add-lec-opns" key={classTeaching.details.classId} value={classTeaching.details.classId}>
                    {classTeaching.details.sem}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-7" style={{ margin: "auto" }}>
            <label>Subject: </label>
            <select
              className="add-lec-subject form-control text-center"
              name="subject"
              onChange={this.handleSubChange}
              required
            >
              <option className="add-lec-opns" value="">
                --Choose Subject---
              </option>
              {this.state.classId && this.props.classesTeaching.find((classTeaching) => (classTeaching.details.classId === this.state.classId)).subjects.map((sub) => {
                return (
                  <option className="add-lec-opns" key={sub.code} value={sub.code}>
                    {sub.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-7 mb-3" style={{ margin: "auto" }}>
            <label>Link:</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={this.state.link}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="form-row">
              <div className="col-sm-4">
                <label>Start Time</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  name="startTime"
                  min={Date.now()}
                  id="startTime"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="col-sm-4">
                <label>End Time</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  name="endTime"
                  min={Date.now()}
                  id="endTime"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="col-sm-4">
                <label>Group</label>
                <input
                  className="form-control"
                  type="text"
                  name="group"
                  id="group"
                  onChange={this.handleChange}
                  placeholder="leave blank for whole class!"
                />
              </div>
            </div>
            <label>Description:</label>
            <textarea
              className="form-control col-sm-10"
              id="text"
              style={{ margin: "auto" }}
              value={this.state.text}
              name="text"
              onChange={this.handleChange}
              placeholder="no info provided"
            />
          </div>
          <button className="btn btn-success" type="submit">
            Add Lecture
          </button>          
        </form>
      </div>
    );
  };

  handleSubChange = (e) => {
    const code = e.target.value;    
    const subjects = this.props.classesTeaching.find((classTeaching) => classTeaching.details.classId === this.state.classId).subjects;
    const name = subjects.find((sub) => sub.code === code).name;
    this.setState({
      subjectName: name,
      subjectCode: code
    })
  }

  handleSemChange = (e) => {
    const val = e.target.value;
    let reqClass = {};    
    this.props.classesTeaching.forEach((classTeaching) => {
      if(classTeaching.details.classId === val){
        reqClass = classTeaching.details;
      }
    })    
    this.setState({
      semester: reqClass.sem,
      classId: reqClass.classId
    })   

  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;    
    this.setState({ [nam]: val });
  };

  callAddLecture = (e) => {
    e.preventDefault(); // preventing reload
    const start = Date.parse(this.state.startTime),
      end = Date.parse(this.state.endTime);

    const startDate = new Date(start),
      endDate = new Date(end);

    const newLecture = {      
      subjectName: this.state.subjectName,
      subjectCode: this.state.subjectCode,
      classId: this.state.classId,
      startTime: firebase.firestore.Timestamp.fromDate(startDate),
      endTime: firebase.firestore.Timestamp.fromDate(endDate),
      link: this.state.link,
      text: this.state.text,
      group: this.state.group,
    };
    this.setState({ show: false });
    this.props.addLecture(newLecture);
    this.setState({
      link: "",
      subject: "",
      subjectCode: "",
      startTime: new Date(0),
      endTime: new Date(0),
      text: "",
      group: "",
    });
  };
}

export default AddLecture;
