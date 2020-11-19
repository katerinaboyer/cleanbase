import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { storeLogin } from '../store/userReducer';
import {Form, Col, Row} from 'react-bootstrap';
import ToastMessage from './toast.component';

const bcrypt = require('bcryptjs');

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
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
        if (res.data) {
          bcrypt.compare(password, res.data.password, (err, result) => {
            if (result) { // user is signed in
              const signedInUser = {
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                role: res.data.role,
                _id: res.data._id,
                business_account_id: res.data.business_account_id,
              }

              console.log(signedInUser);

              props.storeLogin(signedInUser);
              history.push('/dashboard');
            } else { // user is not signed in
              setShowToast(true);
            }
          });
        } else {
          setShowToast(true);
        }
      });
    }

    if (showToast) {
      setTimeout(() => {setShowToast(false);}, 5000);
    }

      return (
        <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"25%"}} >
        <h3 className="h3">Log In:</h3>
        <Form onSubmit={onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={4}>Email</Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder="" onChange={onChangeEmail}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={4}>Password</Form.Label>
                <Col sm={8}>
                    <Form.Control type="password" placeholder="" onChange={onChangePassword}/>
                </Col>
            </Form.Group>

            <button className="button-submit" type="submit">
                Sign In
            </button>
        </Form>
        <ToastMessage show={showToast} text={"That login did not match any account."}/>
        </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
  storeLogin
})(SignIn);
