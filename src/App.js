import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import StuLanding from "./StuComponents/stuLanding";
import CrLanding from "./CrComponents/crLanding";
import About from "./about";
import MainNavBar from "./NavBar/mainNavBar";
import NewCr from "./CrComponents/newCr";
import CrDetails from "./CrComponents/afterSignup";
import TeacherDetails from "./Teacher/AfterSignup";
import Landing from "./Teacher/Landing";
import NewTeacher from "./Teacher/NewTeacher";
import ClassDetails from "./Teacher/ClassDetails";

function App() {
  document.getElementsByTagName("body")[0].classList.add(localStorage.getItem("mode"));
  return (
    <div className="App">
      <Router>
        <MainNavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/student/:code?" exact component={StuLanding} />
          <Route path="/newcr" exact component={NewCr} />
          <Route path="/newcr/details" exact component={CrDetails} />
          <Route path="/cr" exact component={CrLanding} />
          <Route path="/teacher" exact component={Landing} />
          <Route path="/teacher/class" exact component={ClassDetails} />
          <Route path="/newteacher" exact component={NewTeacher} />
          <Route path="/newteacher/details" exact component={TeacherDetails} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
