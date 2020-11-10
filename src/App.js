import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "./store/selectors";

import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";

import AdminSanitation from "./components/admin-sanitation.component";
import CreateUser from "./components/create-user.component";
import LandingPage from "./components/landing-page.component";
import DashboardIndex from "./components/dashboard-index.component";
import SignIn from "./components/signin.component";
import Schedule from "./components/schedule.component";
import About from "./components/about.component";
import NavigationBar from "./components/navbar.component";
import CreateBuilding from "./components/create-building.component";
import CreateDesk from "./components/create-desk.component";
import CreateReservation from "./components/create-reservation.component";
import CreateAccount from "./components/create-account.component";
import CreateRoom from "./components/create-room.component";
import CreateFloor from "./components/create-floor.component";
import ConfirmationPage from "./components/schedule-confirmation.component";
import SanitationRequest from "./components/sanitation-request.component";
import SanitationSchedule from "./components/sanitation-schedule.component";
import AccountSettings from "./components/account-settings-page.component";
import AccountMgmt from "./components/account-management.component";
import SpaceMgmt from "./components/space-management.component";
import AddEmployee from "./components/add-employee.component";

function App(props) {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/dashboard" component={DashboardIndex} />
        <Route exact path="/user" component={CreateUser} />
        <Route exact path="/signin" component={SignIn} />

        <PrivateRoute path="/reservation" component={CreateReservation} />
        <PrivateRoute path="/building" component={CreateBuilding} />
        <PrivateRoute exact path="/account" component={CreateAccount} />
        <PrivateRoute path="/room" component={CreateRoom} />
        <PrivateRoute path="/floor" component={CreateFloor} />
        <PrivateRoute path="/desk" component={CreateDesk} />
        <PrivateRoute path="/schedule" component={Schedule} />
        <Route exact path="/about" component={About} />
        <PrivateRoute
          path="/scheduleConfirmation"
          component={ConfirmationPage}
        />
        <Route path="/sanitationRequest" component={SanitationRequest} />
        <Route path="/sanitation-schedule" component={SanitationSchedule} />
        <PrivateRoute path="/sanitation" component={AdminSanitation} />
        <PrivateRoute path="/account-settings" component={AccountSettings} />
        <PrivateRoute path="/account-mgmt" component={AccountMgmt} />
        <PrivateRoute path="/space-mgmt" component={SpaceMgmt} />
        <PrivateRoute path="/addEmployee" component={AddEmployee} />
      </Switch>
    </Router>
  );
}

function PrivateRoute(props) {
  const history = useHistory();
  const user = useSelector(getUser);
  let accessBool = false;

  // If no access array is provide then any logged in user can access the page
  // If an access array is provide then the users role must be included in the array to access the page
  // ex) <PrivateRoute path="/admin-only" component={AdminOnly} access={['building_admin']} />

  if (props.access === undefined) {
    accessBool = true;
  } else if (props.access.includes(user.role)) {
    accessBool = true;
  }

  if (accessBool) {
    return <Route exact path={props.path} component={props.component} />;
  } else {
    console.log("user not authorized");
    history.replace("/");
    return <div></div>;
  }
}

export default App;
