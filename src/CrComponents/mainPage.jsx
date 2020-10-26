import React, { Component } from "react";
import Subject from "./subject";
import Lecture from "./lecture";
import Announcement from "./announcement";
import AddSubject from "./addSubject";
import AddLecture from "./addLecture";
import AddAnnouncement from "./addAnnouncement";
import AddPoll from "./addPoll";
import AddLink from "./addLink";
import firebase from "../firebase";
import StuList from "./StuList";
import BottomNav from "../BottomNav/bnav";
import Loader from "../Loader/Loader";
import DarkToggle from "../DarkToggle/DarkToggle";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    loading: true,
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
          loading: false,
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
    const Code = this.state.crCode;
    const el = document.createElement("textarea");
    el.innerText = Code;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Code copied!");
  };

  render() {
    const display = this.state.loading ? (
      <Loader />
    ) : (
      <div className="container-fluid">
        <div className="code-head-btn">
          <DarkToggle />
          <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
            CR Control Page!
          </h1>
          <Dropdown className="float-md-right mb-2">
            <Dropdown.Toggle className="acc-dropdown" id="dropdown-basic">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item> {this.state.details.crName} </Dropdown.Item>
              <Dropdown.Item onClick={this.copyLink}>
                {" "}
                {this.state.crCode}{" "}
              </Dropdown.Item>
              <Link
                to={{
                  pathname: "/cr/class",
                  state: {
                    classId: this.state.crCode,
                    details: this.state.details,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <Dropdown.Item href="/cr/class">Class Details</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => this.handleSignOut()}>
                <i
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  className="fa fa-sign-out"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* lectures on the day */}
        <div id="Lectures">
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
        <div id="Announcements">
          <div className="d-inline container-fluid">
            <h2 className="subHeading">
              Mitron! Announcement Suno{" "}
              <span role="img" aria-label="announcement">
                📢
              </span>
            </h2>
            <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
          </div>

          <div className="d-flex justify-content-center mb-4">
            <AddAnnouncement AddAnnouncement={this.AddAnnouncement} />
            <AddPoll addPoll={this.AddAnnouncement} />
            <AddLink addLink={this.AddAnnouncement} />
          </div>

          <div className="key-container">
            <div className="poll-card m-2" style={{ width: "90px" }}>
              <span className="p-2">
                <i className="fa fa-bookmark text-danger mr-1" /> Official
              </span>
            </div>
            <div className="poll-card m-2" style={{ width: "150px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  📢{" "}
                </span>{" "}
                Announcements
              </span>
            </div>
            <div className="poll-card m-2" style={{ width: "75px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  🔗
                </span>
                Links
              </span>
            </div>
            <div className="poll-card m-2" style={{ width: "75px" }}>
              <span className="p-2">
                <span role="img" className="mr-1" aria-label="announcement">
                  🗳️
                </span>
                Polls
              </span>
            </div>
          </div>
        </div>
        <div className="m-4 mx-n3 ann-container">
          {this.state.announcements.map((announcement) => (
            <Announcement
              announcement={announcement}
              id={announcement.dateAndTime}
              key={announcement.dateAndTime}
              onDelete={this.deleteAnnouncement}
            />
          ))}
        </div>
        {/* list of subjects */}
        <div id="Subjects">
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

        {/* Students list */}
        <StuList code={this.state.crCode} />

        <BottomNav paths={["Lectures", "Announcements", "Subjects"]} />
      </div>
    );
    return display;
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
  addSubject = (addSubject) => {
    const classId = this.state.crCode;
    const teachClassRef = db
      .collection("teachers")
      .doc(addSubject.teacherId)
      .collection("classes")
      .doc(classId);
    const teachClass = {
      details: {
        course: this.state.details.course,
        branch: this.state.details.branch,
        sem: this.state.details.sem,
        crName: this.state.details.crName,
        classId: classId,
      },
      subjects: [
        {
          name: addSubject.subject,
          code: addSubject.subjectCode,
        },
      ],
    };
    const { subject, subjectCode, teacher, teacherId } = addSubject;
    const newSubject = { subject, subjectCode, teacher, teacherId };
    this.docRef.update({
      subjects: firebase.firestore.FieldValue.arrayUnion(newSubject),
    });

    db.runTransaction((trans) => {
      return trans.get(teachClassRef).then((doc) => {
        if (doc.exists) {
          trans.update(teachClassRef, {
            subjects: firebase.firestore.FieldValue.arrayUnion(
              teachClass.subjects[0]
            ),
          });
        } else {
          teachClassRef.set(teachClass);
        }
      });
    });
  };

  addLecture = (newLecture) => {
    const finLectures = [...this.state.lecturesToday, newLecture];
    this.docRefLec.update({
      lectures: finLectures,
    });
  };

  AddAnnouncement = (newAnnouncement) => {
    const finAnnouncements = [...this.state.announcements, newAnnouncement];
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
        (a) => a.dateAndTime !== dateAndTime
      ),
    });
  };

  deleteSubject = (subject) => {
    const teachClassRef = db
      .collection("teachers")
      .doc(subject.teacherId)
      .collection("classes")
      .doc(this.state.crCode);
    this.docRef.update({
      subjects: this.state.subjects.filter(
        (s) => s.subjectCode !== subject.subjectCode
      ),
    });
    const remSub = {
      code: subject.subjectCode,
      name: subject.subject,
    };
    db.runTransaction((trans) => {
      return trans.get(teachClassRef).then((doc) => {
        if (doc.data().subjects.length === 1) {
          trans.delete(teachClassRef);
        } else {
          trans.update(teachClassRef, {
            subjects: firebase.firestore.FieldValue.arrayRemove(remSub),
          });
        }
      });
    });
  };

  deleteLecture = (lecture) => {
    this.docRefLec.update({
      lectures: firebase.firestore.FieldValue.arrayRemove(lecture),
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
