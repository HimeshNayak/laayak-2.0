import React, { Component } from "react";
import firebase from "../firebase";
import Loader from "../Loader/Loader";
import CrLogin from "./crLogin";
import MainPage from "./mainPage";

const db = firebase.firestore();

class CrLanding extends Component {
  isMount = false;

  state = {
    user: null,
    doc: "",
    loading: true
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = db.collection("students").doc("listOfCRs");
        docRef.get().then((doc) => {
          const loc = doc.data().listOfCRs;
          const email = user.email;
          if (this.isMount) {
            this.setState({
              doc: loc[email],
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
    this.isMount = true;
    this.authListener();
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    let display;
    (this.state.loading) && (display = <Loader />)
    if (!this.state.loading) {
      this.state.user && this.state.doc ?
        display = <MainPage CrCode={this.state.doc} /> :
        display = <CrLogin />
    }
    setTimeout(() => {
      if (this.isMount) {
        this.setState({ loading: false })
      }
    }, 2000)
    return display;
  }
}
export default CrLanding;
