import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import StuLanding from "./StuComponents/stuLanding";
import StuSignup from './StuComponents/StuSignup';
import CrLanding from "./CrComponents/crLanding";
import About from "./about";
import MainNavBar from "./NavBar/mainNavBar";
import NewCr from "./CrComponents/newCr";
import CrDetails from "./CrComponents/afterSignup";
import TeacherDetails from "./Teacher/AfterSignup";
import Landing from "./Teacher/Landing";
import NewTeacher from "./Teacher/NewTeacher";
import ClassDetails from "./Teacher/ClassDetails";
import classDetails from "./CrComponents/ClassDetails";
import TeacherLogin from "./Teacher/TeacherLogin";
import CrLogin from "./CrComponents/crLogin";
import NotFound from "./NotFound/NotFound";
import StuLogin from "./StuComponents/StuLogin";
import Profile from "./StuComponents/profile/Profile";

function App() {
  document.getElementsByTagName("body")[0].classList.add(localStorage.getItem("mode"));
  return (
    <div className="App">
      <Router>
        <MainNavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/student" exact component={StuLanding} />
          <Route path="/student/login" exact component={StuLogin} />
          <Route path="/student/signup" exact component={StuSignup} />
          <Route path="/student/profile" exact component={Profile} />
          <Route path="/newcr" exact component={NewCr} />
          <Route path="/newcr/details" exact component={CrDetails} />
          <Route path="/cr" exact component={CrLanding} />
          <Route path="/cr/login" exact component={CrLogin} />
          <Route path="/cr/class" exact component={classDetails} />
          <Route path="/teacher" exact component={Landing} />
          <Route path="/teacher/login" exact component={TeacherLogin} />
          <Route path="/teacher/class" exact component={ClassDetails} />
          <Route path="/newteacher" exact component={NewTeacher} />
          <Route path="/newteacher/details" exact component={TeacherDetails} />
          <Route path="/about" exact component={About} />
          <Route path="/" component={NotFound} />                  
        </Switch>
      </Router>
    </div>
  );
}

export default App;
