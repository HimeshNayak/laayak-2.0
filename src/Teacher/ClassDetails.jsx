import React, { Component } from 'react';
import Details from "../CrComponents/details";
import Announcement from "./Announcement";
import Announce from "./Announce";
import AddPoll from "./AddPoll";
import AddLink from "./AddLink";
import firebase from "../firebase";
import { Link } from 'react-router-dom';
let db = firebase.firestore();


class classDetails extends Component {
    state = {
        details: [],
        announcements: [],
        user: firebase.auth().currentUser,
        classId: this.props.location.state.classId
    };

    collRef = db.collection("classes");
    docRef = this.collRef.doc(this.state.classId);    ;
    collRefUp = this.docRef.collection("updates");
    docRefUp = this.collRefUp.doc("announcements");

    componentDidMount() {
        this.docRef.onSnapshot((doc) => {
          if (doc.data()) {
            this.setState({              
              details: doc.data().details,
            });
          }
        });        
        this.docRefUp.onSnapshot((doc) => {
          if (doc.data()) {
              doc.data().announcements.map((announcement) => {
                if(announcement.isOfficial){
                    this.setState({
                      announcements: this.state.announcements.concat(announcement)
                    })
                }
              });
            this.sortAnnouncements();
          }
        });
      }
    render() {
        return ( 
            <div className="container-fluid">
        <div className="code-head-btn">          

          <h1 className="mainPageHeading mx-auto" style={{ marginTop: "-3vh" }}>
            Class Details
          </h1>
          <Link className="btn btn-info mr-2 ml-n5" to="/teacher">
            Home
          </Link>
        </div>
        {/* semester details */}
        <h2 className="subHeading">Info: </h2>
        <hr className="mb-4" style={{ margin: "0 auto", width: "18rem" }} />

        <Details details={this.state.details} onEdit={this.handleDetailsEdit} />
        {/* Announcement/polls/links */}
        <div id="announcements">
          <div className="d-inline container-fluid">
            <h2 className="subHeading">Manage Announcements 📢</h2>
            <hr className="mb-4" style={{ margin: "0 auto", width: "40%" }} />
          </div>

          <div className="d-flex justify-content-center mb-4">
            <Announce AddAnnouncement={this.AddAnnouncement} />
            <AddPoll addPoll={this.AddAnnouncement} />
            <AddLink addLink={this.AddAnnouncement} />
          </div>

          <div className="key-container">
            <h5 className="m-2" style={{ textDecoration: "underline" }}>
              Key
            </h5>
            <div className="announcement-card m-2" style={{ width: "120px" }}>
              <span className="p-2">Announcements</span>
            </div>
            <div className="link-card m-2" style={{ width: "50px" }}>
              <span className="p-2">Links</span>
            </div>
            <div className="poll-card m-2" style={{ width: "50px" }}>
              <span className="p-2">Polls</span>
            </div>
          </div>
        </div>
        <div className="m-4 ann-container">
          {this.state.announcements.map((announcement) => (
            <div key={announcement.dateAndTime}>
              <Announcement
                announcement={announcement}                
                onDelete={this.deleteAnnouncement}
              />
            </div>
          ))}
        </div>        
      </div>
           
        );
    }
    sortAnnouncements = () => {
        let temp = this.state.announcements;
        for (let i = 0; i < temp.length; i++) {
          for (let j = i + 1; j < temp.length; j++) {
            if (temp[i].dateAndTime < temp[j].dateAndTime) {
              let x = temp[i];
              temp[i] = temp[j];
              temp[j] = x;
            }
          }
        }
        this.setState({
          announcements: temp,
        });
      };
      AddAnnouncement = (newAnnouncement) => {
        const finAnnouncements = [...this.state.announcements, newAnnouncement];
        this.docRefUp.update({
          announcements: finAnnouncements,
        });
      };
      deleteAnnouncement = (dateAndTime) => {
        this.docRefUp.update({
          announcements: this.state.announcements.filter(
            (a) => a.dateAndTime != dateAndTime
          ),
        });
      };      
    }
export default classDetails;
