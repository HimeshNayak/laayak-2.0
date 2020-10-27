import React, { Component } from "react";
import Details from "./details";
import Subject from "./subject";
import Lecture from "./lecture";
import Announcement from "./announcement";
import BottomNav from "../BottomNav/bnav";
import firebase from "../firebase";
import Loader from "../Loader/Loader";
import DarkToggle from "../DarkToggle/DarkToggle";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import M from 'materialize-css';

// reference to firestore
const db = firebase.firestore();

class MainPage extends Component {
  state = {
    stuDoc: {},
    classCode: " ",
    name: "",
    rollNo: "",
    subjects: [],
    details: [],
    lecturesToday: [],
    announcements: [],
    loading: true,
  };
  stuDocRef = db.collection("students").doc(this.props.email);

  fetchClassDetails = () => {
    db.collection("classes").doc(this.state.classCode).onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          subjects: doc.data().subjects.map((subject) => { return { ...subject } }),
          details: doc.data().details,
          loading: false,
        })
      }
    });
    db.collection("classes").doc(this.state.classCode).collection("lectures").doc("lecturesToday").onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          lecturesToday: doc.data().lectures.map((lecture) => { return { ...lecture } })
        });
      }
    });
    db.collection("classes").doc(this.state.classCode).collection("updates").doc("announcements").onSnapshot((doc) => {
      if (doc.data()) {
        this.setState({
          announcements: doc.data().announcements.map((announcement) => { return { ...announcement } }),
        });
        this.sortAnnouncements();
      }
    });
  }

  // extracting data from db
  componentDidMount() {
    this.stuDocRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          stuDoc: doc.data(),
          classCode: doc.data().classCode
        })
        if(doc.data().classCode){
          this.fetchClassDetails();
        }
      } else {
        this.setState({ loading: false })
      }
    })
  }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        M.toast({html: "Signed Out", classes: "toast success-toast"})
        window.location.reload();
      })
      .catch((err) => {
        M.toast({html: err.message, classes: "toast error-toast"});
      });
  };

  render() {
    var display = <Loader />
    display = this.state.loading ? <Loader /> : (
      <div className="container-fluid">
        <div className="code-head-btn">
          <DarkToggle />
          <h1 className="mainPageHeading mb-5">Welcome!</h1>
          <Dropdown className="float-md-right mb-2">
            <Dropdown.Toggle className="acc-dropdown" id="dropdown-basic">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link
                to={{
                  pathname: "/student/profile",
                  state: {doc: this.state.stuDoc}
                }}
                style={{ textDecoration: "none" }}
              >
                <Dropdown.Item href="/student/profile">
                  Profile
                </Dropdown.Item>
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
        {/* semester details */}
        <div id="Class">
          <h2 className="subHeading">Class Details: </h2>
        </div>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <Details details={this.state.details} />

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

        <BottomNav
          paths={["Class", "Lectures", "Announcements", "Subjects"]}
        />
      </div>
    )
    return (this.state.classCode !== " ") ? display : <h1>Join Your Friends</h1>; 
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
