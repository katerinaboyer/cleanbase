import React, { Component } from "react";
import axios from "axios";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
    this.onChangeFloorId = this.onChangeFloorId.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeRoomType = this.onChangeRoomType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      room_number:"",
      floor_id: "",
      capacity: "",
      room_type: "",
      floors: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/floors/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            floors: response.data.map((floor) => floor._id),
            floor_id: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeRoomNumber(e) {
    this.setState({
      room_number: e.target.value,
    });
  }

  onChangeFloorId(e) {
    this.setState({
      floor_id: e.target.value,
    });
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  onChangeRoomType(e) {
    this.setState({
      room_type: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newRoom = {
      room_number: this.state.room_number,
      floor_id: this.setState.floor_id,
      capacity: this.setState.capacity,
      room_type: this.setState.room_type
    };

    console.log(newRoom);

    axios
      .post("http://localhost:5000/rooms/add", newRoom)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Create New Room</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Room Number: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.room_number}
              onChange={this.onChangeRoomNumber}
            />
          </div>
          <div className="form-group">
            <label>Floor Id: </label>
            <select
              ref="floorInput"
              required
              className="form-control"
              value={this.state.floor_id}
              onChange={this.onChangeFloorId}
            >
              {this.state.floors.map((floor) => {
                return (
                  <option key={floor} value={floor}>
                    {floor}
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
            <label>Room Type: </label>
            <select 
              required
              className="form-control"
              value={this.state.room_type}
              onChange={this.onChangeRoomType}
              >
                <option value="desk_space">Desk Space</option>
                <option value="office">Office</option>
                <option value="conference">Conference</option>
              </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Room"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
