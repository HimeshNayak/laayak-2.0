import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

let db = firebase.firestore();

class TeacherLogin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const email = this.state.email,
    pass = this.state.password;
    db.collection("teachers").doc(email).get().then((doc) => {
    if(doc.data()){
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
          alert("logged in successfully");        
        })
      .catch((err) => {
        alert(err.message);
      });
    } else{
      alert("You are not a Teacher")
    }
  })
  };

  render() {
    return (
      <div style={{marginTop: "30vh"}}>
        <h1>Please Login <span role="img" aria-label="namaste">🙏🏻</span></h1>
        {this.form()}
      </div>
    );
  }

  form = () => {
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
          <button className="btn btn-info" onClick={this.handleLogin}>
            Sign In
          </button>
        </form>
        <p className="text-small">
          <span>New User?  </span>
          <Link to="/newteacher" style={{ color: "#092592", textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </div>
    );
  };
}

export default TeacherLogin;
