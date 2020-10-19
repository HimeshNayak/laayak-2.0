import React, { Component } from "react";
import MainPage from "./MainPage";
import TeacherLogin from "./TeacherLogin";
import firebase from "../firebase";
import Loader from "../Loader/Loader";

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
                    if (this.isMount) {
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
            this.state.user && this.state.doc ?
                display = <MainPage /> :
                display = <TeacherLogin />
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
