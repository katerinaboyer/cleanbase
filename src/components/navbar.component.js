import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { connect, useSelector } from "react-redux";
import { storeLogout } from '../store/userReducer';
import { getUser } from '../store/selectors';

const NavigationBar = () => {
  return (
    <Navbar>
      <Navbar.Brand as={Link} to="/">CleanBase</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/sanitation">Sanitation</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="/signin">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
  storeLogout
})(NavigationBar);
