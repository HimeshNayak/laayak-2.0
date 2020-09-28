import React, { Component } from "react";
import Details from "./details";
import Subject from "./subject";
import Lecture from "./lecture";
import Announcement from "./announcement";
import AddSubject from "./addSubject";
import AddLecture from "./addLecture";
import AddAnnouncement from "./addAnnouncement";
import AddPoll from "./addPoll";
import AddLink from "./addLink";
import firebase from "../firebase";
import BottomNav from "../BottomNav/bnav";

// reference to firestore

let db = firebase.firestore();

class MainPage extends Component {
  state = {
    subjects: [],
    details: [],
    lecturesToday: [],
    announcements: [],
    user: firebase.auth().currentUser,
    crCode: this.props.CrCode,
  };

  collRef = db.collection("classes");
  docRef = this.collRef.doc(this.state.crCode);
  collRefLec = this.docRef.collection("lectures");
  docRefLec = this.collRefLec.doc("lecturesToday");
  collRefUp = this.docRef.collection("updates");
  docRefUp = this.collRefUp.doc("announcements");

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("signed out");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // extracting data from db
  componentDidMount() {
    this.docRef.onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          subjects: doc.data().subjects.map((subject) => {
            return { ...subject };
          }),
          details: doc.data().details,
        });
      }
    });
    this.docRefLec.onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          lecturesToday: doc.data().lectures.map((lecture) => {
            return { ...lecture };
          }),
        });
      }
    });
    this.docRefUp.onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          announcements: doc.data().announcements.map((announcement) => {
            return { ...announcement };
          }),
        });
        this.sortAnnouncements();
      }
    });
  }

  copyLink = () => {
    const link = "localhost:3000/student/"+this.state.crCode;    
    const el = document.createElement("textarea");
    el.innerText = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Invite link copied!");
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="code-head-btn">
          {/* <h5>Code: {this.state.crCode}</h5> */}
          <button className="btn btn-info" onClick={this.copyLink}>
            Invite Students
          </button>
          {/* signout btn */}

          <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
            CR Control Page!
          </h1>
          <button className="btn btn-danger" onClick={this.handleSignOut}>
            Sign Out
          </button>
        </div>
        {/* lectures on the day */}
        <div id="lectures">
          <h2 className="subHeading">Lectures Today:</h2>
        </div>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <AddLecture
          addLecture={this.addLecture}
          subjects={this.state.subjects}
        />
        <div className="lectures-row">
          {this.state.lecturesToday.map((lecture) => (
            <Lecture
              lecture={lecture}
              key={lecture.startTime}
              onDelete={this.deleteLecture}
            />
          ))}
        </div>
        {/* Announcement/polls/links */}
        <div id="announcements">
          <div className="d-inline container-fluid">
            <h2 className="subHeading">Mitron! Announcement Suno 📢</h2>
            <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
          </div>

          <div className="d-flex justify-content-center mb-4">
            <AddAnnouncement AddAnnouncement={this.AddAnnouncement} />
            <AddPoll addPoll={this.AddAnnouncement} />
            <AddLink addLink={this.AddAnnouncement} />
          </div>

          <div className="key-container">
            <h5 className="m-2" style={{ textDecoration: "underline" }}>
              Key
            </h5>
            <div className="announcement-card m-2" style={{ width: "120px" }}>
              <span className="p-2">Announcements</span>
            </div>
            <div className="link-card m-2" style={{ width: "50px" }}>
              <span className="p-2">Links</span>
            </div>
            <div className="poll-card m-2" style={{ width: "50px" }}>
              <span className="p-2">Polls</span>
            </div>
          </div>
        </div>
        <div className="m-4 ann-container">
          {this.state.announcements.map((announcement) => (
            <div key={announcement.dateAndTime}>
              <Announcement                
                announcement={announcement}                
                id={announcement.dateAndTime}
                onDelete={this.deleteAnnouncement}
              />
            </div>
          ))}
        </div>
        {/* list of subjects */}
        <div id="subjects">
          <h2 className="subHeading">Subjects You study:</h2>
        </div>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        {/* button to add a new subject */}
        <AddSubject addSubject={this.addSubject} />
        <div className="my-flex-container">
          {this.state.subjects.map((subject) => (
            <Subject
              subject={subject}
              key={subject.subjectCode}
              onDelete={this.deleteSubject}
            />
          ))}
        </div>
        {/* semester details */}
        <div id="details">
          <h2 className="subHeading">Semester Details: </h2>
        </div>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />
        <BottomNav />{" "}
      </div>
    );
  }
  // Sort Announcements
  sortAnnouncements = () => {
    let temp = this.state.announcements;
    for (let i = 0; i < temp.length; i++) {
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].dateAndTime < temp[j].dateAndTime) {
          let x = temp[i];
          temp[i] = temp[j];
          temp[j] = x;
        }
      }
    }
    this.setState({
      announcements: temp,
    });
  };

  // All add functions
  addSubject = (newSubject) => {
    // const finSubjects = [...this.state.subjects, newSubject];

    this.docRef.update({
      subjects: firebase.firestore.FieldValue.arrayUnion(newSubject)
    });
  };

  addLecture = (newLecture) => {
    const finLectures = [...this.state.lecturesToday, newLecture];
    console.log(finLectures);
    this.docRefLec.update({
      lectures: finLectures,
    });
  };

  AddAnnouncement = (newAnnouncement) => {
    const finAnnouncements = [...this.state.announcements, newAnnouncement];
    // console.log(finAnnouncements);
    this.docRefUp.update({
      announcements: finAnnouncements,
    });
  };

  // All update/edit functions
  handleDetailsEdit = () => {};

  // All delete functions
  deleteAnnouncement = (dateAndTime) => {
    this.docRefUp.update({
      announcements: this.state.announcements.filter(
        (a) => a.dateAndTime != dateAndTime
      ),
    });
  };

  deleteSubject = (subjectCode) => {
    this.docRef.update({
      subjects: this.state.subjects.filter((s) => s.subjectCode != subjectCode),
    });
  };

  deleteLecture = (link, startTime) => {
    this.docRefLec.update({
      lectures: this.state.lecturesToday.filter(
        (l) => l.link != link && l.startTime != startTime
      ),
    });
  };
}

export default MainPage;

// TODO:
// logout btn
// cards of subjects
// lectures today + // announcements
// cr profile with sem and batch details

// passwordCSE@laayak
