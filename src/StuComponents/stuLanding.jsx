import React, { Component } from "react";
import firebase from "../firebase";
import MainPage from "./mainPage";

const db = firebase.firestore();

class StuLanding extends Component {
  isMount = false;
  state = {
    studentCode: "",
    rightCode: false,
  };

  componentDidMount() {
    this.isMount = true;
    var code;
    if (this.isMount) {
      if ((code = this.props.match.params.code)) {
        this.setState({
          studentCode: code,
          rightCode: true,
        })
        localStorage.setItem("studentCode", code);
      };
      if (localStorage.getItem("studentCode")) {
        this.setState({
          studentCode: localStorage.getItem("studentCode"),
          rightCode: true,
        });
      }
    }
  }

  componentWillMount() {
    this.isMount = false;
  }

  handleChange = (e) => {
    const nam = e.target.name,
      val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const code = this.state.studentCode;
    if (code === "") {
      alert("Please enter the code!");
    } else {
      const docRef = db.collection("classes").doc(code);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ rightCode: true });
            localStorage.setItem("studentCode", this.state.studentCode);
          } else {
            this.setState({ rightCode: false });
            alert("Wrong code entered, try again");
          }
        })
        .catch(() => {
          this.setState({ rightCode: false });
          alert("Wrong code entered, try again");
        });
    }
  };

  render() {
    return <div>{this.getPageData()}</div>;
  }

  getPageData = () => {
    if (!this.state.rightCode) {
      return (
        this.getCodeForm()
      );
    } else {
      return <MainPage studentCode={this.state.studentCode} />;
    }
  };

  getCodeForm = () => {
    return (
      <div className="main-container">
        <div className="container-login mx-auto">
          <div className="con-login">
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
              <div className="con-inputs mt-4">
                <div className="con-input">
                  <label htmlFor="code">
                    Class Code
                        </label>
                  <input
                    placeholder="Code provided by CR"
                    id="code"
                    name="studentCode"
                    type="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <footer>
                <button type="submit" className="btn-login">
                  Log In
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default StuLanding;
