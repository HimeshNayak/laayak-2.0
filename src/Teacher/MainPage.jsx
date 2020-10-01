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

  claRef = db.collection("classes");
  teachRef = db.collection("teachers").doc(this.state.user.email);
  teachClassRef = this.teachRef.collection("classes");

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
            loading: false
          });
        }
      })
      this.teachClassRef.onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((classTeaching) => {
          let { classesTeaching } = this.state;
          classesTeaching.push(classTeaching.data());
          if (this.isMount) {
            this.setState({ classesTeaching })
          }
          this.claRef.doc(classTeaching.id).collection("lectures").doc("lecturesToday").onSnapshot((snap) => {
            let { lecturesToday } = this.state;
            snap.data().lectures.forEach((l) => {
              classTeaching.data().subjects.forEach((sub) => {
                if (l.subjectCode === sub.code) {
                  lecturesToday.push({ ...l, branch: classTeaching.data().details.branch, sem: classTeaching.data().details.sem, classId: classTeaching.data().details.classId });
                }
              })
            })
            if (this.isMount) {
              this.setState({ lecturesToday })
            }
          })
        })
      })
      // this.collRef.onSnapshot((querySnapshot) => {
      //   querySnapshot.docs.forEach((doc) => {
      //     doc.data().subjects.forEach(subject => {
      //       this.teachRef.onSnapshot((teacher) => {
      //         teacher.data().subjects.forEach((teachSub) => {
      //           if (subject.subjectCode === teachSub.subjectCode) {
      //             if (this.isMount) {
      //               let { classesTeaching } = this.state;
      //               const temp = { ...doc.data().details, subject: teachSub.subjectName, classId: doc.id };
      //               classesTeaching.push(temp)
      //               // Object.assign(doc.data().details, { classId: doc.id, subject: teachSub.subjectName })
      //               this.setState({ classesTeaching })
      //             }
      //             this.collRef.doc(doc.id).collection("lectures").doc("lecturesToday").onSnapshot((lecDoc) => {
      //               lecDoc.data().lectures.forEach((lecture) => {
      //                 if (lecture.subjectCode === teachSub.subjectCode) {
      //                   if (this.isMount) {
      //                     let { lecturesToday } = this.state;
      //                     const foundLecture = {
      //                       ...lecture,
      //                       branch: doc.data().details.branch,
      //                       sem: doc.data().details.sem,
      //                       subject: teachSub.subjectName,
      //                       classId: doc.id
      //                     }
      //                     lecturesToday.push(foundLecture)
      //                     this.setState({ lecturesToday })
      //                   }
      //                 }
      //               })
      //             });
      //           }
      //         })
      //       })
      //     })
      //   })
      // });
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
        {/* CLASSES YOU TEACH */}
        <h2 className="subHeading">Classes You Teach:</h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />
        <div className="my-flex-container">
          {this.state.classesTeaching.map((classTeaching) => (
            classTeaching.subjects.map((subTeaching) =>(
              <Class
              details={classTeaching.details}
              subject={subTeaching}
              key={classTeaching.details.classId + subTeaching.code}
            />
            ))            
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
    this.claRef.doc(newLecture.classId).collection("lectures").doc("lecturesToday").update({
      lectures: firebase.firestore.FieldValue.arrayUnion(updatedLecture)
    })
    this.setState({
      lecturesToday: []
    });
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
    this.claRef.doc(lecture.classId).collection("lectures").doc("lecturesToday").update({
      lectures: firebase.firestore.FieldValue.arrayRemove(delLec)
    })
    this.setState({
      lecturesToday: []
    });
  };
}

export default MainPage;