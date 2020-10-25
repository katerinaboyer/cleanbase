import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import './../styles.css';

const NavigationBar = props => {
  const history = useHistory();
  const location = useLocation();
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
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/sanitation">Sanitation</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {(user.name === ''  && location.pathname !== "/user") &&
            <>
              <Nav.Link href="/user">Sign Up Here</Nav.Link>
              <Button href="/signin" style={{ border:"none"}}>Log in</Button>
            </>
          }
          {(user.name === '' && location.pathname === "/user" && <Button href="/signin" style={{ border:"none"}}>Log in</Button>)}
          {(user.name !== '') && (
            <>
              <Navbar.Brand>Logged in as: {user.name}</Navbar.Brand>
              <Button onClick={logout} style={{ border:"none"}}>Logout</Button>
            </>
          )}
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
