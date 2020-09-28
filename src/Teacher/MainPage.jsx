import React, { Component } from "react";
import Details from "./Details";
import Class from "./Class";
import Lecture from "./Lecture";
import AddLecture from "./AddLecture";
import Loader from "../Loader/Loader";
import firebase from "../firebase";

// reference to firestore

let db = firebase.firestore();

class MainPage extends Component {
  isMount = false;
  state = {
    classesTeaching: [],
    details: [],
    lecturesToday: [],
    user: firebase.auth().currentUser,
    loading: true
  };

  collRef = db.collection("classes");
  collRefTeach = db.collection("teachers");
  teachRef = this.collRefTeach.doc(this.state.user.email);

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("signed out");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // extracting data from db  
  componentDidMount() {
    // only data fetch
    this.isMount = true;
    setTimeout(() => {
      this.collRef.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          doc.data().subjects.forEach(subject => {
            if (subject.subjectCode === this.state.details.subjectCode) {
              if (this.isMount){
              this.setState({
                classesTeaching: this.state.classesTeaching.concat(Object.assign(doc.data().details, { classId: doc.id }))
              })}
              this.collRef.doc(doc.id).collection("lectures").doc("lecturesToday").onSnapshot((lecDoc) => {
                lecDoc.data().lectures.map((lecture) => {
                  if (lecture.subjectCode == this.state.details.subjectCode) {
                    if (this.isMount){
                    this.setState({
                      lecturesToday: this.state.lecturesToday.concat(Object.assign(lecture, {
                        branch: doc.data().details.branch,
                        sem: doc.data().details.sem,
                        cr: doc.data().details.crName,
                        classId: doc.id
                      }))
                    })
                  }
                }
                })
              });
            }
          })
        })
      });
      this.teachRef.onSnapshot((teacher) => {
        if (this.isMount){
        this.setState({
          details: teacher.data().details,
          loading: false
        })}
      })
    }, 2000)
  }

  componentWillMount() {
    this.isMount = false;
  }

  render() {
    const display = this.state.loading ? <Loader /> : (
      <div className="container-fluid">
        <div className="code-head-btn">
          {/* signout btn */}

          <h1 className="mainPageHeading mx-auto" style={{ marginTop: "-3vh" }}>
            Teacher Control Center!
          </h1>
          <button className="btn btn-danger" onClick={this.handleSignOut}>
            Sign Out
          </button>
        </div>
        <h2 className="subHeading">Your Details: </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />
        {/* lectures on the day */}
        <h2 className="subHeading">Lectures Today:</h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        <AddLecture
          addLecture={this.addLecture}
          classesTeaching={this.state.classesTeaching}
        />

        <div className="lectures-row">
          {this.state.lecturesToday.map((lecture) => (
            <Lecture
              lecture={lecture}
              key={lecture.startTime + lecture.classId}
              onDelete={this.deleteLecture}
            />
          ))}
        </div>
        <h2 className="subHeading">Classes You Teach:</h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        {/* <AddClass addSubject={this.addSubject} /> */}

        <div className="my-flex-container">
          {this.state.classesTeaching.map((classTeaching) => (
            <Class
              details={classTeaching}
              key={classTeaching.classId}
              onDelete={this.deleteSubject}
            />
          ))}
        </div>
      </div>
    );
    return display
  }
  // All add functions
  addLecture = (newLecture) => {
    const updatedLecture = {
      subject: this.state.details.subjectName,
      subjectCode: this.state.details.subjectCode,
      teacher: this.state.details.name,
      link: newLecture.link,
      startTime: newLecture.startTime,
      endTime: newLecture.endTime,
      group: newLecture.group,
      text: newLecture.text
    }
    this.collRef.doc(newLecture.classId).collection("lectures").doc("lecturesToday").update({
      lectures: firebase.firestore.FieldValue.arrayUnion(updatedLecture)
    })
    // this.setState({
    //   classTeaching: [],
    //   lecturesToday: []
    // })
  };
  // All update/edit functions
  handleDetailsEdit = () => { };

  // All delete functions  
  deleteLecture = (lecture) => {
    const delLec = {
      subject: lecture.subject,
      subjectCode: lecture.subjectCode,
      teacher: lecture.teacher,
      group: lecture.group,
      link: lecture.link,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      text: lecture.text,
    }
    this.collRef.doc(lecture.classId).collection("lectures").doc("lecturesToday").update({
      lectures: firebase.firestore.FieldValue.arrayRemove(delLec)
    })
    // this.setState({
    //   classTeaching: [],
    //   lecturesToday: []
    // })
  };
}

export default MainPage;