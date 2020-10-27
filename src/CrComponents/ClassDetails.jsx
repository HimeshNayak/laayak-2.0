import React, { Component } from 'react';
import Details from "../CrComponents/details";
import firebase from "../firebase";
import { Link } from 'react-router-dom';
import BottomNav from '../BottomNav/bnav';
import DarkToggle from '../DarkToggle/DarkToggle';
import StuList from './StuList';
let db = firebase.firestore();


class classDetails extends Component {
  isMount = false
  state = {
    details: this.props.location.state.details,
    classId: this.props.location.state.classId
  };

  collRef = db.collection("classes");
  docRef = this.collRef.doc(this.state.classId);;  

  componentDidMount() {
  }
  componentWillMount() {
    this.isMount = false;
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="code-head-btn">
          <DarkToggle />
          <h1 className="mainPageHeading" style={{ marginTop: "-3vh" }}>
            Class Details
          </h1>
          <Link className="float-md-right mb-2 mr-2" to="/cr">
            <i className="fa fa-home" style={{fontSize: "30px", color: "#000"}}></i>
          </Link>
        </div>
        {/* semester details */}
        <h2 id="Details" className="subHeading">Info: </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />

        {/* students details */}
        <h2 id="Students" className="subHeading">Students: </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <StuList code={this.state.classId} />
        <BottomNav
          paths={["Details", "Students"]}
        />
      </div>

    );
  }
}
export default classDetails;
