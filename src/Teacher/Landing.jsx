import React, { Component } from "react";
import MainPage from "./MainPage";
import TeacherLogin from "./TeacherLogin";
import firebase from "../firebase";

const db = firebase.firestore();

class Landing extends Component {
    isMount = false
    state = {
        user: null,
        doc: "",
    };

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const docRef = db.collection("teachers").doc(user.email);
                docRef.get().then((doc) => {   
                    if(this.isMount){                 
                    this.setState({
                        doc: doc,
                    });
                }
                });
            }
            this.setState({ user });
        });
    };

    componentDidMount() {
        this.isMount = true
        this.authListener();
    }
    componentWillUnmount() {
        this.isMount = false
    }

    render() {
        return this.state.user && this.state.doc ? (
            <MainPage />
        ) : (      
            (<TeacherLogin />)          
            );
    }
}
export default Landing;
