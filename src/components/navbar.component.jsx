import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, Button,NavDropdown } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import './../styles.css';
import navlogo, {ReactComponent as NavLogo} from "./../Navbar-Logo.svg";

const NavigationBar = props => {
  const history = useHistory();
  const user = useSelector(getUser);

  const logout = () => {
    props.storeLogout();
    history.replace("/");
  };

  return (
    <div style={{color:"white"}}>
      <Navbar className="nav-bar">
        <Navbar.Brand as={Link} to="/">
            <img src={navlogo} width="135px"/>
            CleanBase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-bar-items">
          <Nav className="mr-auto" style={{paddingLeft: '40px'}}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/schedule">Schedule</Nav.Link>
            <Nav.Link href="/sanitation">Sanitation</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" className="nav-bar">
            {user.name != "" && 
            <NavDropdown title="USER NAME" className="nav-bar">
              <NavDropdown.Item href="/account-settings">Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown> }
            {user.name === "" && <Button style={{ border:"none"}} href="/signin">Login</Button>}
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
