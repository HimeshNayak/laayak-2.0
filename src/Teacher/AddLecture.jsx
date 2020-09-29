import React, { Component } from "react";
import firebase from "../firebase";
class AddLecture extends Component {
  isMount = false;
  state = {
    show: false,
    link: "",
    branch: "",
    semester: "",
    subject: [],
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
  showHideClassName = () => (this.state.show ? "" : "d-none");

  styles = {
    position: "fixed",
    display: "block",
    background: "pink",
    color: "black",
    width: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  };

  render() {
    return (
      <div>
        <button className="btn-info btn-lg mb-4" onClick={this.showModal}>
          Add Lecture +
        </button>
        <div className={this.showHideClassName()} style={this.styles}>
          {this.getForm()}
          <button className="btn btn-info m-2" onClick={this.hideModal}>
            Close
          </button>
        </div>
      </div>
    );
  }

  getForm = () => {
    return (
      <div>
        <form className="m-2" onSubmit={this.callAddLecture}>
          <h3>Add Lecture Details:</h3>
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
              {this.props.subjects.map((subject) => {
                return (
                  <option className="add-lec-opns" key={subject.subjectCode} value={subject.subjectCode}>
                    {subject.subjectName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-7" style={{ margin: "auto" }}>
            <label>Branch: </label>
            <select
              className="add-lec-subject form-control text-center"
              name="branch"
              onChange={this.handleBranchChange}
              required
            >
              <option className="add-lec-opns" value="">
                --Choose Branch---
              </option>              
              {this.props.classesTeaching.filter((classTeaching) => classTeaching.subject === this.state.subject.subjectName).map((classTeaching) => {
                return (
                  <option className="add-lec-opns" key={classTeaching.classId} value={classTeaching.branch}>
                    {classTeaching.branch}
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
              {this.props.classesTeaching.filter((classTeaching) => (classTeaching.branch === this.state.branch) && (classTeaching.subject === this.state.subject.subjectName)).map((classTeaching) => {
                return (
                  <option className="add-lec-opns" key={classTeaching.classId} value={classTeaching.classId}>
                    {classTeaching.sem}
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
    let reqSub = [];
    if(e.target.value){
    reqSub = this.props.subjects.find((subject)=> subject.subjectCode === e.target.value )
    }
    this.setState({
      subject: reqSub
    });    
  }

  handleBranchChange = (e) => {    
    const val = e.target.value;    
    this.setState({
      branch: val,      
    });
  };

  handleSemChange = (e) => {
    const val = e.target.value;
    let reqClass = {};    
    this.props.classesTeaching.forEach((classTeaching) => {
      if(classTeaching.classId === val){
        reqClass = classTeaching;
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
      subjectName: this.state.subject.subjectName,
      subjectCode: this.state.subject.subjectCode,
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
