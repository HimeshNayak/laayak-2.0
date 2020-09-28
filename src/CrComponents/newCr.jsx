import React, { Component } from "react";
import firebase from "../firebase";
import { Link, Redirect } from "react-router-dom";

const auth = firebase.auth(),
  db = firebase.firestore();

class NewCr extends Component {
  isMount = false;

  state = {
    email: "",
    password: "",
    listOfCRs: {},
    authStatus: false,
    completedSignUp: false,
  };

  componentDidMount() {
    this.isMount = true;
    const docRef = db.collection("students").doc("listOfCRs");
    docRef.onSnapshot((doc) => {
      if (this.isMount) {
        this.setState({
          listOfCRs: { ...doc.data().listOfCRs },
        });
      }
    });

    if (this.isMount) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const stuRef = db.collection("students").doc("listOfCRs");
          stuRef.onSnapshot((snap) => {
            let listOfCRs = { ...snap.data().listOfCRs };
            if (listOfCRs[user.email]) {
              this.setState({
                completedSignUp: true,
              });
            }
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!this.state.authStatus) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("successfully signed up!");
          this.setState({ authStatus: true });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  render() {
    if (this.state.completedSignUp) return <Redirect to="/cr" />;

    return this.state.authStatus ? (
      <Redirect to="/newcr/details" />
    ) : (
      <div>
        <h1>Sign Up</h1>
        {this.getForm()}
      </div>
    );
  }

  getForm = () => {
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="email@example.com"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="btn btn-info" onClick={this.handleSignUp}>
            Sign Up
          </button>
        </form>
        <p className="text-small">
          Existing User?{" "}
          <Link to="/cr" style={{ color: "purple" }}>
            Sign In
          </Link>
        </p>
      </div>
    );
  };
}

export default NewCr;
