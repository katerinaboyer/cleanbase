import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeFloorAssigned = this.onChangeFloorAssigned.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      business_name: '',
      floor_assigned: '',
      floors: [],
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/floors/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    floors: response.data.map(floor => floor),
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })
  }

  onChangeFloorAssigned(e) {
    this.setState({
      floor_assigned: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newAccount = {
        business_name: this.state.business_name,
        floor_assigned: this.state.floor_assigned
    }

    console.log(newAccount);

    axios.post('http://localhost:5000/accounts/add', newAccount)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New Account</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
            <label>Business Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.business_name}
                onChange={this.onChangeBusinessName}
                />
          </div>
        <div className="form-group"> 
          <label>Floor Assigned: </label>
          <select ref="floorInput"
              required
              className="form-control"
              value={this.state.floor_assigned}
              onChange={this.onChangeFloorAssigned}>
              {
                this.state.floors.map((floor) => {
                  return <option 
                    key={floor._id}
                    value={floor._id}>{floor.floor_number}
                    </option>;
                })
              }
          </select>
        </div>

          <div className="form-group">
            <input type="submit" value="Create Account" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}