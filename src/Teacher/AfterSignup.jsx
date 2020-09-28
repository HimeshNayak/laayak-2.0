import React, { Component } from "react";
import firebase from "../firebase";
import { Redirect } from "react-router-dom";
const db = firebase.firestore(),
    auth = firebase.auth();

let docRef = db.collection("classes").doc();

class AfterSignup extends Component {
    isMount = false
    state = {
        details: {
            name: "",
            college: "",
            subjectName: "",
            subjectCode: ""
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

    handleChange = (e) => {
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
                            details: this.state.details
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
                    <h1 className="mt-2">Fill in the important information please</h1>
                    {this.getDetails()}
                </div>
            );
        }
    }

    getDetails = () => {
        return (
            <form onSubmit={this.handleSubmitDetails} className="col-sm-5 mt-4 text-left">
                {/* <legend>General Details:</legend> */}
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.details["name"]}
                        class="form-control"
                        placeholder="First Name "
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject name:</label>
                    <input
                        type="text"
                        name="subjectName"
                        id="subject-name"
                        value={this.state.details["subjectName"]}
                        class="form-control"
                        placeholder="Subject name"
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject Code:</label>
                    <input
                        type="text"
                        name="subjectCode"
                        id="subject-code"
                        value={this.state.details["subjectCode"]}
                        class="form-control"
                        placeholder="Subject Code"
                        onChange={this.handleChange}
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
