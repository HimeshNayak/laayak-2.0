import React, { Component } from "react";
import MainPage from "./MainPage";
import firebase from "../firebase";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";
import Forbidden from "../forbidden/Forbidden";

const db = firebase.firestore();

class Landing extends Component {
    isMount = false
    state = {
        user: null,
        doc: "",
        loading: true
    };

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const docRef = db.collection("teachers").doc(user.email);
                docRef.get().then((doc) => {
                    if (doc.data()) {
                        (this.isMount) &&
                            this.setState({
                                doc: doc,
                            });
                    }
                });
            }
            if (this.isMount) {
                this.setState({ user });
            }
        });
    };

    componentDidMount() {
        this.isMount = true
        this.authListener();
    }
    componentWillMount() {
        this.isMount = false
    }

    render() {
        let display;
        (this.state.loading) && (display = <Loader />)
        if (!this.state.loading) {
            if (this.state.user) {
                if (this.state.doc) {
                    display = <MainPage />
                } else {
                    display = <Forbidden />
                }
            } else {
                return <Redirect to="/teacher/login" />
            }
        }
        setTimeout(() => {
            if (this.isMount) {
                this.setState({ loading: false })
            }
        }, 2000)
        return display;
    }
}
export default Landing;
