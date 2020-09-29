import React, { Component } from "react";
import Details from "./Details";
import Class from "./Class";
import Lecture from "./Lecture";
import AddLecture from "./AddLecture";
import Loader from "../Loader/Loader";
import firebase from "../firebase";
import AddSubject from "./AddSubject";
import Subject from "./Subject";

// reference to firestore

let db = firebase.firestore();

class MainPage extends Component {
  isMount = false;
  state = {
    classesTeaching: [],
    details: [],
    subjects: [],
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
      this.teachRef.onSnapshot((teacher) => {
        if (this.isMount) {
          this.setState({
            details: teacher.data().details,
            subjects: teacher.data().subjects,
            loading: false
          })
        }
      })
      this.collRef.onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          doc.data().subjects.forEach(subject => {
            this.teachRef.onSnapshot((teacher) => {
              teacher.data().subjects.forEach((teachSub) => {
            if (subject.subjectCode === teachSub.subjectCode) {
              if (this.isMount) {
                this.setState({
                  classesTeaching: this.state.classesTeaching.concat(Object.assign(doc.data().details, { classId: doc.id, subject: teachSub.subjectName }))
                })
              }
              this.collRef.doc(doc.id).collection("lectures").doc("lecturesToday").onSnapshot((lecDoc) => {
                lecDoc.data().lectures.forEach((lecture) => {
                  if (lecture.subjectCode === teachSub.subjectCode) {
                    if (this.isMount) {
                      this.setState({
                        lecturesToday: this.state.lecturesToday.concat(Object.assign(lecture, {
                          branch: doc.data().details.branch,
                          sem: doc.data().details.sem,
                          subject: teachSub.subjectName,
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
          })
        })
      });
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
          subjects={this.state.subjects}
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
        {/* YOUR SUBJECTS */}
        <div id="subjects">
          <h2 className="subHeading">Your Subjects:</h2>
        </div>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        {/* button to add a new subject */}
        <AddSubject addSubject={this.addSubject} />
        <div className="my-flex-container">
          {this.state.subjects.map((subject) => (
            <Subject
              subject={subject}
              key={subject.subjectCode}
              onDelete={this.deleteSubject}
            />
          ))}
        </div>
        {/* CLASSES YOU TEACH */}
        <h2 className="subHeading">Classes You Teach:</h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <div className="my-flex-container">
          {this.state.classesTeaching.map((classTeaching) => (
            <Class
              details={classTeaching}
              key={classTeaching.classId+classTeaching.subject}
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
      subject: newLecture.subjectName,
      subjectCode: newLecture.subjectCode,
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
  };

  addSubject = (newSubject) => {
    this.teachRef.update({
      subjects: firebase.firestore.FieldValue.arrayUnion(newSubject)
    })
  }
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
  };
  deleteSubject = (subject) => {
    this.teachRef.update({
      subjects: firebase.firestore.FieldValue.arrayRemove(subject)
    })
  }
}

export default MainPage;