import React, { Component } from "react";
import firebase from "../firebase";
import { Link, Redirect } from "react-router-dom";

const auth = firebase.auth(),
  db = firebase.firestore();

class NewTeacher extends Component {
  state = {
    email: "",
    password: "",
    authStatus: false,
    completedSignUp: false,
  };

  componentDidMount() {}

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
    if (this.state.completedSignUp) return <Redirect to="/teacher" />;
    return this.state.authStatus ? (
      <Redirect to="/newteacher/details" />
    ) : (
        <div style={{ marginTop: "30vh" }}>
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
          <span>Existing User?  </span>
          <Link to="/teacher" style={{ color: "#092592", textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
      </div>
    );
  };
}

export default NewTeacher;
