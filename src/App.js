import React from "react";
import { Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './components/create-user.component';
import HomePage from './components/user-homepage.component';
import SignIn from './components/signin.component';
import Schedule from './components/schedule.component';
import Sanitation from './components/sanitation.component';
import About from './components/about.component';
import NavigationBar  from './components/navbar.component.js';

function App(props) {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/user" component={CreateUser} />
        <PrivateRoute path="/schedule" component={Schedule} />
        <PrivateRoute path="/sanitation" component={Sanitation} />
        <PrivateRoute path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function PrivateRoute(props) {
  const history = useHistory();

  //if (user.name) {
    return (
      <Route exact path={props.path} component={props.component} />
    )
  //} else {
  //  console.log("access denied. User: ", user, ", page: ", props.path);
  //  history.replace("/signin");
  //  return <div></div>
  //}
}

export default App;
