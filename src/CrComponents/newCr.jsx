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
          alert(err.message);
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
      <div>{this.getForm()}</div>
    );
  }

  getForm = () => {
    return (
      <div className="main-container">
        <div className="container-login mx-auto">
          <div className="con-login">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSignUp} style={{ width: "100%" }}>
              <div className="con-inputs mt-4">
                <div className="con-input">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="email@example.com"
                    id="email"
                    name="email"
                    value={this.state.email}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-input">
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="con-new">
                  Already registered? <Link to="/cr">Log In</Link>
                </div>
              </div>
              <footer>
                <button type="submit" className="btn-login">
                  Register
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default NewCr;
