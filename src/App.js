import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './components/create-user.component';
import HomePage from './components/user-homepage.component';
import Schedule from './components/schedule.component';
import Sanitation from './components/sanitation.component';
import About from './components/about.component';
import CreateBuilding from "./components/create-building.component";
import CreateDesk from "./components/create-desk.component"
import CreateReservation from "./components/create-reservation.component";
import CreateAccount from "./components/create-account.component";


function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" component={HomePage} />
        <Route path="/user" component={CreateUser} />
        <Route path="/reservation" component={CreateReservation} />
        <Route path="/building" component={CreateBuilding} />
        <Route path="/account" component={CreateAccount} />
        <Route path="/desk" component={CreateDesk} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/sanitation" component={Sanitation} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
