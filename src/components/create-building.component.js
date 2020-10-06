import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBuilding extends Component {
  constructor(props) {
    super(props);

    this.onChangeBuildingAdmin = this.onChangeBuildingAdmin.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      building_admin: '',
      capacity: '',
      floor_list: '',
      address: '',
      workers: '',
      users: []
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.name),
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  onChangeBuildingAdmin(e) {
    this.setState({
      building_admin: e.target.value
    })
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newBuilding = {
        building_admin: this.state.building_admin,
        capacity: this.state.capacity,
        address: this.state.address
    }

    console.log(newBuilding);

    axios.post('http://localhost:5000/buildings/add', newBuilding)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New Building</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Building Admin: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.building_admin}
              onChange={this.onChangeBuildingAdmin}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
          <div className="form-group"> 
            <label>Capacity: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.capacity}
                onChange={this.onChangeCapacity}
                />
          </div>
          <div className="form-group"> 
            <label>Address: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.address}
                onChange={this.onChangeAddress}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Building" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}