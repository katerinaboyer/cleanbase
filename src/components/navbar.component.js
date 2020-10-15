import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';


export default class NavigationBar extends Component {

  render() {
    return (
      <div>
      <Navbar>
            <Navbar.Brand style={{color: "white"}} href="#home">CleanBase</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{color: "white"}} href="/">Home</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="/schedule">Schedule</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="/sanitation">Sanitation</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="/about">About</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                <Nav.Link style={{color: "white"}} href="/user">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
  }
}