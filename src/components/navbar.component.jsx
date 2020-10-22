import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import './../styles.css';

const NavigationBar = props => {
  const history = useHistory();
  const user = useSelector(getUser);

  const logout = () => {
    props.storeLogout();
    history.replace("/");
  };

  return (
    <Navbar>
      <Navbar.Brand as={Link} to="/" >
        CleanBase
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{paddingLeft: '40px'}}>
          <Nav.Link className="nav-bar" href="/home">Home</Nav.Link>
          <Nav.Link className="nav-bar" href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/sanitation">Sanitation</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {user.name === "" && <Button style={{ border:"none"}} href="/signin">Login</Button>}
          {user.name != "" && <Button style={{ border:"none"}} onClick={logout}>Logout</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  storeLogout
})(NavigationBar);
