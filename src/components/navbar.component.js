import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';


export default class NavigationBar extends Component {

  render() {
    return (
      <div>
      <Navbar>
            <Navbar.Brand href="#home">CleanBase</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/schedule">Schedule</Nav.Link>
                    <Nav.Link href="/sanitation">Sanitation</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                <Nav.Link href="/user">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
  }
}