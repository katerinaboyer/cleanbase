import React, { Component } from "react";
import axios from "axios";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);

    this.state = {
      business_name: "",
      rooms_assigned: [],
      rooms: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            rooms: response.data.map((room) => room._id),
            rooms_assigned: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value,
    });
  }

  onChangeRoomsAssigned(e) {
      this.setState({
          rooms_assigned: e.target.value
      })
  }

  onSubmit(e) {
    e.preventDefault();

    const newAccount = {
      business_name: this.state.business_name,
      rooms_assigned: this.state.rooms_assigned
    };

    console.log(newAccount);

    axios
      .post("http://localhost:5000/accounts/add", newAccount)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Business Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.business_name}
              onChange={this.onChangeBusinessName}
            />
          </div>
          <div className="form-group">
            <label>Rooms Assigned: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.rooms_assigned}
              onChange={this.onChangeRoomsAssigned}
            >
              {this.state.rooms.map((room) => {
                return (
                  <option key={room} value={room}>
                    {room}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Account"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
