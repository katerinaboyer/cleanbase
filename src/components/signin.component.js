import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router';
import { storeLogin } from '../store/userReducer';
import { getUser } from '../store/selectors';

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
            }

            props.storeLogin(signedInUser);
            history.push('/');
          } else { // user is not signed in
            console.log('invalid sign in');
          }
        });
      });
    }

      return (
        <div>
          <h3>Sign In:</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                required
                className="form-control"
                value={email}
                onChange={onChangeEmail}
              />
              <label>Password: </label>
              <input
                type="text"
                required
                className="form-control"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="signin user"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
  storeLogin
})(SignIn);
