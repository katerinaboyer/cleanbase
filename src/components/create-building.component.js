import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBuilding extends Component {
  constructor(props) {
    super(props);

    this.onChangeBuildingAdmin = this.onChangeBuildingAdmin.bind(this);
    this.onChangeNumFloors = this.onChangeNumFloors.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      building_admin: '',
      num_floors: '',
      capacity: '',
      address: '',
      users: []
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/users/building_admins?role=building_admin', {
        params: {
          role: 'building_admin'
        }
      })
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user),
                    building_admin: response.data[0]
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

  onChangeNumFloors(e) {
      this.setState({
          num_floors: e.target.value
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
        num_floors: this.state.num_floors,
        capacity: this.state.capacity,
        address: this.state.address
    }

    console.log(newBuilding);

    axios.post('http://localhost:5000/buildings/add', newBuilding)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div style={{color:"white"}}>
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
                this.state.users.map((user) => {
                  return <option 
                    key={user._id}
                    value={user._id}>{user.name}
                    </option>;
                })
              }
          </select>
        </div>
          <div className="form-group"> 
            <label>Number of Floors: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.num_floors}
                onChange={this.onChangeNumFloors}
                />
          </div>
          <div className="form-group"> 
            <label>Capacity: </label>
            <input  type="number"
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