import React, { Component } from "react";

class About extends Component {
  state = {};

  render() {
    return (
      <div className="about">
        <h1 className="about-title">About LaayaK</h1>
        <div className="about-content">
          <p>
            One of the major problems faced by college students in this pandemic
            is ineffective communication between the class representative /
            professor regarding online lectures and other miscellaneous agendas.
            Sometimes the link of the class may not reach the students on time
            which creates a confusion among the crowd. Similarly, internal polls
            conducted by the class representative may not be fair as it becomes
            hard for the CR to go through the chats on class group and find out
            the majority vote.
          </p>
          <br />
          <p>
            LaayaK - A solution to efficient circulation of lecture links,
            announcements, polls, etc. with real-time notifications, provides
            all features needed to reduce the load of the class representative
            while easing out the process of obtaining and visit the meeting link
            for the students along with real-time notifications of announcements
            and polls.
          </p>
        </div>
        <h1 className="about-title">Developers</h1>
        <h5>
          PARV SHARMA
          <br />
          <span className="dev-email">pscoder10462@gmail.com</span>
        </h5>
        <h5>
          HIMESH NAYAK
          <br />
          <span className="dev-email">himeshnayak015@gmail.com</span>
        </h5>
        <h5>
          HARESH NAYAK
          <br />
          <span className="dev-email">sketchharry01@gmail.com</span>
        </h5>
      </div>
    );
  }
}

export default About;
