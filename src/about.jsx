import React, { Component } from "react";

class About extends Component {
  state = {};
  dev = [    
    {
      name: "Himesh Nayak",
      github: "https://github.com/HimeshNayak",
      linkedin: "https://www.linkedin.com/in/himeshnayak015/ ",
      gmail: "mailto:himeshnayak015@gmail.com",
      image: "https://media-exp1.licdn.com/dms/image/C5103AQHO_Jyl6CG8GA/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=F3LtbM89vLovUjBts0OBBmnkalI43MVtKep7kP10HPA"
    },
    {
      name: "Haresh Nayak",
      github: "https://github.com/hareshnayak",
      linkedin: "https://www.linkedin.com/in/hareshnayak08/",
      gmail: "mailto:sketchharry01@gmail.com",
      image: "https://media-exp1.licdn.com/dms/image/C5603AQHFeBYzJ48Byg/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=ek3HwQzlMXKLwnkixsIxZz2vncpMwBa8jNx4gpz1MBc"
    },
    {
      name: "Parv Sharma",
      github: "https://github.com/PSCoder10462",
      linkedin: "https://www.linkedin.com/in/parv-sharma-3ba3991a1/",
      gmail: "mailto:pscoder10462@gmail.com",
      image: "https://avatars0.githubusercontent.com/u/59911189?s=460&u=aa564b3cd9c35caaf8d6442dd4482fdaa9b0ee2e&v=4"
    },
    {
      name: "Kashish Jain",
      github: "https://github.com/Kashishjain04",
      linkedin: "https://www.linkedin.com/in/kashishjain04/",
      gmail: "mailto:jainabhishek7204@gmail.com",
      image: "https://media-exp1.licdn.com/dms/image/C4D03AQGmJfba6MM8tA/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=tt1PtERwASD3Coof32xdpogVwmK1cacGJmMESUnvyO4"
    }
  ]

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
        <h1 className="about-title mt-5">Developers</h1>
        {this.dev.map((item) => (
        <div className="dev-container mx-3 my-4" key={item.name}>
          <div className="social">
            <a href={item.github} target="_blank" rel="noopener noreferrer"><i className="fa fa-github" aria-hidden="true"></i> </a>
          </div>
          <div className="social">
          <a href={item.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" aria-hidden="true"></i> </a>
          </div>
          <div className="social">
          <a href={item.gmail} target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" aria-hidden="true"></i> </a>
          </div>
          <div className="name">{item.name}</div>       
          <img src={item.image} alt={item.name} />
        </div>
        ))}      
      </div>
    );
  }
}

export default About;
