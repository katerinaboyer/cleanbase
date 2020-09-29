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
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/schedule">Schedule</Nav.Link>
                    <Nav.Link href="/sanitation">Sanitation</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">ExcerTracker</Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item">
      //     <Link to="/user" className="nav-link">Create User</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
    );
  }
}