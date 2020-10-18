import React, { Component } from "react";
import Details from "./details";
import Subject from "./subject";
import Lecture from "./lecture";
import Announcement from "./announcement";
import BottomNav from "../BottomNav/bnav";
import firebase from "../firebase";
import "./assets/css/mainPage.css";
import Loader from "../Loader/Loader";
import DarkToggle from "../DarkToggle";

// reference to firestore
const db = firebase.firestore();

class MainPage extends Component {
  collRef = db.collection("classes");
  docRef = this.collRef.doc(this.props.studentCode);
  collRefLec = this.docRef.collection("lectures");
  docRefLec = this.collRefLec.doc("lecturesToday");
  collRefUp = this.docRef.collection("updates");
  docRefUp = this.collRefUp.doc("announcements");
  state = {
    subjects: [],
    details: [],
    lecturesToday: [],
    announcements: [],
    loading: true,
  };

  // extracting data from db
  componentDidMount() {
    // console.log(db.collection("classes"));
    this.docRef.onSnapshot((doc) => {
      if (doc.data()) {
        setTimeout(() => {
          this.setState({
            subjects: doc.data().subjects.map((subject) => { return { ...subject } }),
            details: doc.data().details,
            loading: false,
          })
        }, 2000);
      }
    });
    this.docRefLec.onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          lecturesToday: doc.data().lectures.map((lecture) => { return { ...lecture } })
        });
      }
    });
    this.docRefUp.onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          announcements: doc.data().announcements.map((announcement) => { return { ...announcement } }),
        });
        this.sortAnnouncements();
      }
    });
  }

  render() {
    const logout = () => {
      localStorage.removeItem("studentCode");
      console.log("props", window.location);
      window.location.pathname = "/";
    };
    var display = <Loader />
    display = this.state.loading ? <Loader /> : (
      <div className="container-fluid">
        <div>
          <DarkToggle />          
          <button
            onClick={() => logout()}
            className="btn btn-sm float-md-right btn-dark mb-2"
          >
            Logout
    </button>
          <h1 className="mainPageHeading">Welcome!</h1>
          {/* lectures on the day */}
          <div id="Lectures">
            <h2 className="subHeading">Lectures Today:</h2>
          </div>
          <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />

          <div className="lectures-row">
            {this.state.lecturesToday.map((lecture) => (
              <Lecture lecture={lecture} key={lecture.startTime} />
            ))}
          </div>

          {/* Announcement/polls/links */}
          <div id="Announcements">
            <div className="d-inline container-fluid">
              <h2 className="subHeading">Mitron! Announcement Suno <span role="img" aria-label="announcement">📢</span></h2>
              <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
            </div>
            <div className="key-container">
              <div className="poll-card m-2" style={{ width: "90px" }}>
                <span className="p-2"><i className="fa fa-bookmark text-danger mr-1" /> Official</span>
              </div>
              <div className="poll-card m-2" style={{ width: "150px" }}>
                <span className="p-2"><span role="img" className="mr-1" aria-label="announcement">📢  </span> Announcements</span>
              </div>
              <div className="poll-card m-2" style={{ width: "75px" }}>
                <span className="p-2"><span role="img" className="mr-1" aria-label="announcement">🔗</span>Links</span>
              </div>
              <div className="poll-card m-2" style={{ width: "75px" }}>
                <span className="p-2"><span role="img" className="mr-1" aria-label="announcement">🗳️</span>Polls</span>
              </div>
            </div>
          </div>
          <div className="m-4 mx-n3 ann-container">
            {this.state.announcements.map((announcement) => (
              <Announcement
                key={announcement.dateAndTime}
                announcement={announcement}
                id={announcement.dateAndTime}
              />
            ))}
          </div>

          {/* list of subjects */}
          <div id="Subjects">
            <h2 className="subHeading">Subjects You study:</h2>
          </div>
          <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />

          <div className="my-flex-container">
            {this.state.subjects.map((subject) => (
              <Subject subject={subject} key={subject.subjectCode} />
            ))}
          </div>

          {/* semester details */}
          <div id="Semester">
            <h2 className="subHeading">Semester Details: </h2>
          </div>
          <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
          <Details details={this.state.details} />

          <BottomNav
            paths={["Lectures", "Announcements", "Subjects", "Semester"]}
          />
        </div>
      </div>
    )
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
}

export default MainPage;
