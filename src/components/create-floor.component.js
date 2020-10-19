import React, { Component } from "react";
import axios from "axios";

export default class CreateFloor extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloorNumber = this.onChangeFloorNumber.bind(this);
    this.onChangeBuildingId = this.onChangeBuildingId.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      floor_number: "",
      building_id: "",
      capacity: "",
      buildings: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/buildings/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            buildings: response.data.map((building) => building._id),
            building_id: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeFloorNumber(e) {
    this.setState({
      floor_number: e.target.value,
    });
  }

  onChangeBuildingId(e) {
      this.setState({
          building_id: e.target.value
      })
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newFloor = {
      floor_number: this.state.floor_number,
      building_id: this.state.building_id,
      capacity: this.state.capacity,
    };

    console.log(newFloor);

    axios
      .post("http://localhost:5000/floors/add", newFloor)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New Floor</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Floor Number: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.floor_number}
              onChange={this.onChangeFloorNumber}
            />
          </div>
          <div className="form-group">
            <label>Building Id: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.building_id}
              onChange={this.onChangeBuildingId}
            >
              {this.state.buildings.map((building) => {
                return (
                  <option key={building} value={building}>
                    {building}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Capacity: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.capacity}
              onChange={this.onChangeCapacity}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Floor"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
