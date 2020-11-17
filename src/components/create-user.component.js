import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import {Form, Col, Row} from 'react-bootstrap';
import ToastMessage from './toast.component';
const bcrypt = require('bcryptjs');

const CreateUser = (props) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState('');

  const [validated, setValidated] = useState(false);
  const [validatedToast, setValidatedToast] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  }

  const onChangeRole = (e) => {
    setRole(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeCheckPassword = (e) => {
    if(password !== e.target.value){
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() && passwordMatch) {
      setValidated(true);

      const newUser = {
        email: email,
        name: name,
        phone: phone,
        password: bcrypt.hashSync(password, 10),
        role: role,
      };

      axios.post('http://localhost:5000/users/add/', newUser)
        .then(res => {
          history.push('/signin');
        })
        .catch(res => {
          setShowToast(true);
        });
    } else {
      setValidated(false);
      setValidatedToast(true);
    }
  }

  if (showToast) {
    setTimeout(() => {setShowToast(false);}, 5000);
  }

  if (validatedToast) {
    setTimeout(() => {setValidatedToast(false);}, 5000);
  }

  return (
    <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
      <h3 className="h3">Create Account:</h3>
      <Form noValidate onSubmit={onSubmit}>

        <Form.Group as={Row} controlId="validationEmail">
          <Form.Label column sm={3}>Email</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="name"
              placeholder="Enter email"
              onChange={onChangeEmail}
              required
              //pattern=".{1,}@[^.]{1,}"
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} controlId="validationName">
          <Form.Label column sm={3}>Name</Form.Label>
          <Col sm={9}>
            <Form.Control type="name" placeholder="Enter name" onChange={onChangeName} required/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAdmin">
          <Form.Label column sm={3}>Phone</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="name"
              placeholder="ex: 1234567890"
              onChange={onChangePhone}
              required
              //pattern=""
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAdmin">
          <Form.Label column sm={3}>Password</Form.Label>
          <Col sm={9}>
            <Form.Control type="password" placeholder="Enter password" onChange={onChangePassword} required/>
            <Form.Text id="passwordHelp" style={{color:"white"}}>
              We recommend your password be 8-20 character long, contain letters, numbers,
              and special characters.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAdmin">
          <Form.Label column sm={3}>Confirm Password</Form.Label>
          <Col sm={9}>
            <Form.Control type="password" placeholder="Enter password again" required/>
            <Form.Text id="confirmPassword" muted>
              {passwordMatch}
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAdmin">
          <Form.Label column sm={3}>Role</Form.Label>
          <Col sm={9}>
            <Form.Control as="select" onChange={onChangeRole} required>
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
      <ToastMessage show={showToast}  error={true} text={"Oops, it looks like that didn't work! That username might be taken."}/>
      <ToastMessage show={validatedToast}  error={true} text={"That input seems invalid, check again."}/>
    </div>
  )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(CreateUser);
