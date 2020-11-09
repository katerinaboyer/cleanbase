import React, { Component } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import {Form, Col, Row} from 'react-bootstrap';
const bcrypt = require('bcryptjs');

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      email: "",
      name: "",
      phone: "",
      password: "",
      passwordMatch: true,
      role: "",
    };
  }

  componentDidMount() {
    this.setState({
        email: '',
        name: '',
        phone: '',
        password: '',
        role: '',
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeCheckPassword(e) {
    if(this.state.password !== e.target.value){
      this.setState({
        passwordMatch: false,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      password: bcrypt.hashSync(this.state.password, 10),
      role: this.state.role,
    };

    // window.location = '/'; // take user back to homepage on submit
    axios.post('http://localhost:5000/users/add/', newUser)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create Account:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Email</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="" onChange={this.onChangeEmail}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Name</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="" onChange={this.onChangeName}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Phone</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="xxx-xxx-xxxx" onChange={this.onChangePhone}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Password</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="" onChange={this.onChangePassword}/>
                    <Form.Text id="passwordHelp" style={{color:"white"}}>
                      Your password must be 8-20 character long, contain letters and numbers, 
                      and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Confirm Password</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder=""/>
                    <Form.Text id="confirmPassword" muted>
                      {this.state.passwordMatch}
                    </Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Role</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeRole}>
                      <option value="-">-</option>
                      <option value="employee">Employee</option>
                      <option value="office_manager">Office Manager</option>
                      <option value="building_admin">Building Admin</option>
                      <option value="sanitation">Sanitation Staff</option>
                    </Form.Control>
                </Col>
            </Form.Group>

            <button className="button-submit" type="submit">
                Create Account
            </button>
        </Form>
      </div>
    )
  }
}
