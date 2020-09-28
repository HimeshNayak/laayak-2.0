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
        <div className="d-flex flex-column align-items-center">
          <h1>Fill in the important information please</h1>
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
      <form onSubmit={this.handleSubmitDetails} className="col-sm-5 text-left">
        <legend>General Details:</legend>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="crName"
            id="crName"
            value={this.state.details["crName"]}
            class="form-control"
            placeholder="username"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            name="course"
            id="course"
            value={this.state.details["course"]}
            class="form-control"
            placeholder="eg. btech"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            id="branch"
            value={this.state.details["branch"]}
            class="form-control"
            placeholder="eg. Computer Science Engineering"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sem:</label>
          <input
            type="text"
            name="sem"
            id="sem"
            value={this.state.details["sem"]}
            onChange={this.handleChange}
            class="form-control"
            placeholder="eg. 3rd"
            required
          />
        </div>
        <div className="form-group">
          <label>College:</label>
          <input
            type="text"
            name="college"
            id="college"
            value={this.state.details["college"]}
            class="form-control"
            placeholder="college name"
            onChange={this.handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
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
