import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      name: '',
      phone: '',
      role: '',
    }
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

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      role: this.state.role,
    }

    console.log(newUser);

    axios.post('http://localhost:5000/users/add', newUser)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Phone: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.phone}
                onChange={this.onChangePhone}
                />
          </div>
          <div className="form-group">
            <label>Role: </label>
            <select
              ref="roleInput"
              required
              className="form-control"
              value={this.state.role}
              onChange={this.onChangeRole}
              >
                <option value="employee">Employee</option>
                <option value="office_manager">Office Manager</option>
                <option value="building_admin">Building Admin</option>
                <option value="sanitation">Sanitation Staff</option>
              </select>
          </div>

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}