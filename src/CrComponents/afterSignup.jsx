import React, { Component } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";
const db = firebase.firestore(),
  auth = firebase.auth();

let docRef = db.collection("classes").doc();

class AfterSignup extends Component {
  isMount = false;
  state = {
    details: {
      branch: "",
      college: "",
      course: "",
      crName: "",
      sem: "",
      timeTable: "Himesh set krega",
    },
    listOfCRs: {},
    redirect: false,
  };

  componentDidMount() {
    this.isMount = true;
    if (this.isMount) {
      auth.onAuthStateChanged((user) => {
        if (this.isMount) {
          if (user) {
            this.setState({
              user,
              forgery: false,
            });
            this.addDoc();
          } else {
            this.setState({ forgery: true });
          }
        }
      });
    }
  }

  componentWillMount() {
    this.isMount = false;
  }

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value,
      details = { ...this.state.details };
    details[nam] = val;
    this.setState({
      details,
    });
  };

  addDoc = () => {
    console.log("doc add");
    const stuRef = db.collection("students").doc("listOfCRs");
    if (this.state.user) {
      stuRef.onSnapshot((snap) => {
        if (snap.data().listOfCRs[this.state.user.email]) {
          const claRef = db
            .collection("classes")
            .doc(snap.data().listOfCRs[this.state.user.email]);

          claRef.get().then((doc) => {
            if (doc.exists) {
              if (this.isMount) this.setState({ redirect: true });
            } else {
              if (this.isMount) {
                let listOfCRs = {
                  ...snap.data().listOfCRs,
                  [this.state.user.email]: docRef.id,
                };
                this.setState({ listOfCRs });
                if (this.isMount)
                  stuRef.set({
                    listOfCRs: this.state.listOfCRs,
                  });
              }
            }
          });
        } else {
          if (this.isMount) {
            let listOfCRs = {
              ...snap.data().listOfCRs,
              [this.state.user.email]: docRef.id,
            };
            this.setState({ listOfCRs });
            stuRef.set({
              listOfCRs: this.state.listOfCRs,
            });
          }
        }
      });
    }
  };

  render() {
    if (this.state.forgery) return <Redirect to="/newcr" />;
    if (this.state.redirect) {
      return <Redirect to="/cr" />;
    } else {
      return (
        <div>
          {this.getDetails()}
        </div>
      );
    }
  }

  handleSubmitDetails = (e) => {
    e.preventDefault();
    this.initAll();
  };

  getDetails = () => {
    return (
      <div className="main-container">
        <div className="container-login mx-auto">
          <div className="con-login">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmitDetails} style={{ width: "100%" }}>
              <div className="con-inputs mt-4">
                <div className="con-input">
                  <label htmlFor="crName">
                    Username
                  </label>
                  <input
                    placeholder="Username"
                    id="crName"
                    name="crName"
                    value={this.state.details["crName"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="course">
                    Course
                  </label>
                  <input
                    placeholder="Eg. BTech"
                    id="course"
                    name="course"
                    value={this.state.details["course"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="branch">
                    Branch
                  </label>
                  <input
                    placeholder="Eg. CSE"
                    id="branch"
                    name="branch"
                    value={this.state.details["branch"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="sem">
                    Semester
                  </label>
                  <input
                    placeholder="Semester"
                    id="sem"
                    name="sem"
                    value={this.state.details["sem"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="college">
                    College Name
                  </label>
                  <input
                    placeholder="College Name"
                    id="college"
                    name="college"
                    value={this.state.details["college"]}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <footer>
                <button type="submit" className="btn-login">
                  Submit
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  };

  initAll = () => {
    console.log("redirect");
    this.setState({
      redirect: true,
    });
    const obj = { details: this.state.details, subjects: [] };
    docRef.set(obj);
    const upRef = docRef.collection("updates").doc("announcements");
    upRef.set({ announcements: [] });
    const lecRef = docRef.collection("lectures").doc("lecturesToday");
    lecRef.set({ lectures: [] });
    const fcmRef = docRef.collection("fcmTokens").doc("fcmTokens");
    fcmRef.set({ fcmTokens: [] });
  };
}

export default AfterSignup;
