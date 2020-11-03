import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { storeLogin } from '../store/userReducer';
import {Form, Button, Col, Row} from 'react-bootstrap';

const bcrypt = require('bcryptjs');

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
      setPassword(e.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();

      axios.get('http://localhost:5000/users/',
        { params: {email: email}
      }).then(res => {
        bcrypt.compare(password, res.data.password, (err, result) => {
          if (result) { // user is signed in
            const signedInUser = {
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              id: res.data._id,
            }

            props.storeLogin(signedInUser);
            history.push('/dashboard');
          } else { // user is not signed in
            console.log('invalid sign in');
          }
        });
      });
    }

      return (
        <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"25%"}} >
        <h3 className="h3">Create Account:</h3>
        <Form onSubmit={onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={4}>Email</Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder="" onChange={onChangePassword}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={4}>Password</Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder="" onChange={onChangeEmail}/>
                </Col>
            </Form.Group>

            <Button className="button-secondary" type="submit">
                Sign In
            </Button>
        </Form>
        </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
  storeLogin
})(SignIn);
