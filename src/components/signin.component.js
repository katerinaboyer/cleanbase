import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router';
import { storeLogin } from '../store/userReducer';
import { getUser } from '../store/selectors';

const bcrypt = require('bcryptjs');

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          email: "",
          password: "",
          role: "",
        };
    }

    onChangeEmail(e) {
      this.setState({
        email: e.target.value,
      });
    }

    onChangePassword(e) {
      this.setState({
        password: e.target.value,
      });
    }

    onSubmit(e) {
      e.preventDefault();

      axios.get('http://localhost:5000/users/',
        { params: {email: this.state.email}
      }).then(res => {
        bcrypt.compare(this.state.password, res.data.password, (err, result) => {
          if (result) { // user is signed in
            const signedInUser = {
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
            }

            this.props.storeLogin(signedInUser);
          } else { // user is not signed in
            console.log('invalid sign in');
          }
        });
      });
    }

    render() {
      return (
        <div>
          <h3>Sign In:</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <label>Password: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
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
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
  storeLogin
})(SignIn);
