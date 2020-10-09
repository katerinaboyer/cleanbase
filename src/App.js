import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './components/create-user.component';
import MainPage from './components/mainpage.component';
import HomePage from './components/homepage.component';
import Schedule from './components/schedule.component';
import Sanitation from './components/sanitation.component';
import About from './components/about.component';


function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" component={MainPage} />
        <Route path="/home" component={HomePage} />  
        <Route path="/user" component={CreateUser} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/sanitation" component={Sanitation} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
