import React, { Component } from "react";
import firebase from "../firebase";
import MainPage from "./mainPage";

const db = firebase.firestore();

class StuLanding extends Component {
  isMount=false;
  state = {
    studentCode: "",
    rightCode: false,
  };

  componentDidMount() {  
    this.isMount = true;  
    var code;
    if(this.isMount) {
    if((code = this.props.match.params.code)){
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
      return <div>{this.getCodeForm()}</div>;
    } else {
      return <MainPage studentCode={this.state.studentCode} />;
    }
  };

  getCodeForm = () => {
    return (
      <div className="row">
        <form className="container" onSubmit={this.handleSubmit}>
          <h1 className="m-4">Enter the code:</h1>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="password"
              className="form-control col-md-6 col-sm-10"
              placeholder="Code provided by your CR!"
              name="studentCode"
              value={this.state.studentCode}
              onChange={this.handleChange}
              style={{ margin: "0 auto" }}
            />
          </div>
          <button type="submit" className="btn btn-success ">
            Enter
          </button>
        </form>
      </div>
    );
  };
}

export default StuLanding;
