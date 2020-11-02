import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "./store/selectors";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/create-user.component";
import MainPage from "./components/mainpage.component";
import HomePage from "./components/homepage.component";
import SignIn from "./components/signin.component";
import Schedule from "./components/schedule.component";
import UserSanitation from "./components/user-sanitation.component";
import About from "./components/about.component";
import NavigationBar from "./components/navbar.component";
import CreateBuilding from "./components/create-building.component";
import CreateDesk from "./components/create-desk.component";
import CreateReservation from "./components/create-reservation.component";
import CreateAccount from "./components/create-account.component";
import BuildingAdminDash from "./components/building-admin-homepage.component";
import CreateRoom from "./components/create-room.component";
import CreateFloor from "./components/create-floor.component";
import ConfirmationPage from "./components/schedule-confirmation.component";
import SanitationRequest from "./components/sanitation-request.component";
import SanitationSchedule from "./components/sanitation-schedule.component";

function App(props) {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/user" component={CreateUser} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute path="/reservation" component={CreateReservation} />
        <PrivateRoute path="/building" component={CreateBuilding} />
        <Route exact path="/account" component={CreateAccount} />
        <PrivateRoute path="/room" component={CreateRoom} />
        <PrivateRoute path="/floor" component={CreateFloor} />
        <PrivateRoute path="/desk" component={CreateDesk} />
        <PrivateRoute path="/schedule" component={Schedule} />
        <PrivateRoute path="/sanitation" component={UserSanitation} />
        <Route exact path="/about" component={About} />
        <Route path="/scheduleConfirmation" component={ConfirmationPage} />
        <Route path="/sanitationRequest" component={SanitationRequest} />
        <Route path="/building-admin" component={BuildingAdminDash} />
        <Route path="/sanitation-schedule" component={SanitationSchedule} />
      </Switch>
    </Router>
  );
}

function PrivateRoute(props) {
  const history = useHistory();
  const user = useSelector(getUser);
  console.log(user);

  if (true) {
    return <Route exact path={props.path} component={props.component} />;
  } else {
    console.log("user not authorized");
    history.replace("/");
    return <div></div>;
  }
}

export default App;
