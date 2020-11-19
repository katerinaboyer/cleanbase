import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import "./../styles.css";
import navlogo from "./../Navbar-Logo.svg";

const NavbarOptions = props => {
  const user = useSelector(getUser);

  switch (user.role) {
    case "employee":
      return (
        <>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/selfIllnessReports">Report Illness</Nav.Link>
        </>
      );
    case "building_admin":
      return (
        <>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/account-mgmt">Account Management</Nav.Link>
        </>
      );
    case "office_manager":
      return (
        <>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/account-mgmt">Account Management</Nav.Link>
          <Nav.Link href="/space-mgmt">Space Management</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/illness-report">Illness Report</Nav.Link>
        </>
      );
    case "sanitation":
      return (
        <>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/sanitation-schedule">Schedule</Nav.Link>
        </>
      );
    default:
      return (
        <>
          <Nav.Link href="/about">About</Nav.Link>
        </>
      );
  }
};

const NavigationBar = props => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(getUser);

  const logout = () => {
    props.storeLogout();
    history.replace("/");
  };

  const logIn = () => {
    history.push("/signin");
  }

  return (
    <div style={{ color: "white" }}>
      <Navbar collapseOnSelect expand="lg" className="nav-bar">
        <Navbar.Brand as={Link} to="/">
          <img src={navlogo} width="135px" alt="CleanBase Navbar logo" />
          CleanBase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-bar-items">
          <Nav className="mr-auto" style={{ paddingLeft: "40px" }}>
            <NavbarOptions />
          </Nav>
          <Nav className="justify-content-end">
            {user.name !== "" && (
              <NavDropdown title={user.name} className="nav-bar">
                <NavDropdown.Item href="/account-settings">
                  Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {user.name === "" && location.pathname !== "/user" && (
              <>
                <Nav.Link href="/user">Sign Up Here</Nav.Link>
                <button className="button-submit" onClick={logIn}>
                  Log in
                </button>
              </>
            )}
            {user.name === "" && location.pathname === "/user" && (
              <button onClick={logIn} className="button-submit">
                Log in
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  storeLogout
})(NavigationBar);
