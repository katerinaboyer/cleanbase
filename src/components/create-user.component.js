import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      name: "",
      phone: ""
    };
  }

  componentDidMount() {
    this.setState({
        email: '',
        name: '',
        phone: ''
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
    };

    console.log(newUser);
    // window.location = '/'; // take user back to homepage on submit
    axios.post('http://localhost:5000/users/add/', newUser)
        .then(res => console.log(res.data));
    
        console.log("axios post")
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
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
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
              />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
              />
          </div>
        </form>
      </div>
    );
  }
}