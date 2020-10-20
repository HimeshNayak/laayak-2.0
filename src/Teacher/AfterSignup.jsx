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
                <div>
                    {this.getDetails()}
                </div>
            );
        }
    }

    getDetails = () => {
        return (
            <div className="main-container">
                <div className="container-login mx-auto">
                    <div className="con-login">
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmitDetails} style={{ width: "100%" }}>
                            <div className="con-inputs mt-4">
                                <div className="con-input">
                                    <label htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        placeholder="Full Name"
                                        id="name"
                                        name="name"
                                        value={this.state.details["name"]}
                                        type="text"
                                        onChange={this.handleDetailsChange}
                                        required
                                    />
                                </div>
                                <div className="con-input">
                                    <label htmlFor="college">
                                        College Name
                                    </label>
                                    <input
                                        placeholder="College Name"
                                        id="college"
                                        name="college"
                                        value={this.state.details["college"]}
                                        type="text"
                                        onChange={this.handleDetailsChange}
                                        required
                                    />
                                </div>
                            </div>
                            <footer>
                                <button type="submit" className="btn-login">
                                    Submit
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    initAll = () => {
        this.setState({
            redirect: true,
        });        
    };
}

export default AfterSignup;
