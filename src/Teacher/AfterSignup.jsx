import React, { Component } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";
const db = firebase.firestore(),
    auth = firebase.auth();


class AfterSignup extends Component {
    isMount = false
    state = {
        details: {
            name: "",
            college: "",
        },            
        subject: {
            subjectName: "",
            subjectCode: "",
            course: "",        
        },
        redirect: false,
    };

    componentDidMount() {
        this.isMount = true
        auth.onAuthStateChanged((user) => {
            if (this.isMount) {
                if (user) {
                    this.setState({
                        user,
                        forgery: false,
                    });

                } else {
                    this.setState({ forgery: true });
                }
            }
        });
    }

    handleSubmitDetails = (e) => {
        e.preventDefault();
        this.addDoc();
    };

    handleDetailsChange = (e) => {
        const nam = e.target.name,
            val = e.target.value,
            details = { ...this.state.details };
        details[nam] = val;
        if (this.isMount) {
            this.setState({
                details,
            });
        }
    };

    handleSubjectChange = (e) => {
        const nam = e.target.name,
            val = e.target.value,
            subject = { ...this.state.subject };
        subject[nam] = val;
        if (this.isMount) {
            this.setState({
                subject,
            });
        }
    };

    componentWillMount() {
        this.isMount = false;
      }

    addDoc = () => {
        console.log("doc add");
        const stuRef = db.collection("teachers").doc(this.state.user.email);
        if (this.state.user) {
            stuRef.onSnapshot(() => {
                const teachRef = db.collection("teachers").doc(this.state.user.email)
                teachRef.get().then((doc) => {
                    if (doc.exists) {
                        this.setState({ redirect: true });
                    } else {
                        teachRef.set({
                            details: this.state.details,
                            subjects: [this.state.subject]
                        })
                    }
                });
            });
        }
    };

    render() {
        if (this.state.forgery) return <Redirect to="/newteacher" />;
        if (this.state.redirect) {
            return <Redirect to="/teacher" />;
        } else {
            return (
                <div className="d-flex flex-column align-items-center">                    
                    {this.getDetails()}
                </div>
            );
        }
    }

    getDetails = () => {
        return (
            <form onSubmit={this.handleSubmitDetails} className="col-sm-5 mt-4 text-left">                
                <h1 className="mt-2">General Details:</h1>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.details["name"]}
                        class="form-control"
                        placeholder="First Name "
                        onChange={this.handleDetailsChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>College:</label>
                    <input
                        type="text"
                        name="college"
                        id="college"
                        value={this.state.details["college"]}
                        class="form-control"
                        placeholder="college name"
                        onChange={this.handleDetailsChange}
                        required
                    />
                </div>
                <h1 className="mt-2">Primary Subject Info</h1>
                <div className="form-group">
                    <label>Subject name:</label>
                    <input
                        type="text"
                        name="subjectName"
                        id="subject-name"
                        value={this.state.subject["subjectName"]}
                        class="form-control"
                        placeholder="Subject name"
                        onChange={this.handleSubjectChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject Code:</label>
                    <input
                        type="text"
                        name="subjectCode"
                        id="subject-code"
                        value={this.state.subject["subjectCode"]}
                        class="form-control"
                        placeholder="Subject Code"
                        onChange={this.handleSubjectChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <input
                        type="text"
                        name="course"
                        id="course"
                        value={this.state.subject["course"]}
                        class="form-control"
                        placeholder="Course"
                        onChange={this.handleSubjectChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-info">
                    Submit
        </button>
            </form>
        );
    };

    initAll = () => {
        this.setState({
            redirect: true,
        });
        // const obj = { details: this.state.details, subjects: [] };
        // docRef.set(obj);
        // const upRef = docRef.collection("updates").doc("announcements");
        // upRef.set({ announcements: [] });
        // const lecRef = docRef.collection("lectures").doc("lecturesToday");
        // lecRef.set({ lectures: [] });
        // const fcmRef = docRef.collection("fcmTokens").doc("fcmTokens");
        // fcmRef.set({ fcmTokens: [] });
    };
}

export default AfterSignup;
