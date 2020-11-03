import React, { Component } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { getUser } from "../store/selectors";

export default class CreateReservation extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
    this.onChangeDeskNumber = this.onChangeDeskNumber.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeAttendees = this.onChangeAttendees.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // should initialize attendees[0] with the current signed in user
    this.state = {
      title: "",
      room_number: "",
      desk_number: "",
      start_time: "",
      end_time: "",
      date: "",
      attendees: [],
      rooms: [],
      desks: [],
      all_users: [],
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:5000/rooms"),
        axios.get("http://localhost:5000/desks"),
        axios.get("http://localhost:5000/users/all"),
      ])
      .then(([roomResponse, deskResponse, userResponse]) => {
        this.setState({
          rooms: roomResponse.data.map((room) => room),
          room_number: roomResponse.data[0],
          desks: deskResponse.data.map((desk) => desk),
          desk_number: deskResponse.data[0],
          all_users: userResponse.data.map((user) => user)
        });
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeRoomNumber(e) {
    this.setState({
      room_number: e.target.value,
    });
  }

  onChangeDeskNumber(e) {
    this.setState({
      desk_number: e.target.value,
    });
  }

  onChangeStartTime(start_time) {
    this.setState({
      start_time: start_time,
    });
  }

  onChangeEndTime(end_time) {
    this.setState({
      end_time: end_time,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeAttendees(e) {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    this.setState({
      attendees: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newReservation = {
      title: this.state.title,
      room_number: this.state.room_number,
      desk_number: this.state.desk_number,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      date: this.state.date,
      attendees: this.state.attendees,
    };

    console.log(newReservation);

    axios
      .post("http://localhost:5000/reservations/add", newReservation)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div style={{ padding: "35px" }}>
        <h3>Create New Reservation</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Room Number: </label>
            <select
              ref="roomInput"
              required
              className="form-control"
              value={this.state.room_number}
              onChange={this.onChangeRoomNumber}
            >
              {this.state.rooms.map((room) => {
                return (
                  <option key={room._id} value={room._id}>
                    {room.room_number}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Desk Number: </label>
            <select
              ref="roomInput"
              required
              className="form-control"
              value={this.state.desk_number}
              onChange={this.onChangeDeskNumber}
            >
              {this.state.desks.map((desk) => {
                return (
                  <option key={desk._id} value={desk._id}>
                    {desk.desk_number}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Start Time: </label>
            <div>
              <TimePicker
                selected={this.state.start_time}
                onChange={this.onChangeStartTime}
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Time: </label>
            <div>
              <TimePicker
                selected={this.state.end_time}
                onChange={this.onChangeEndTime}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Attendees: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              multiple={true}
              value={this.state.attendees}
              onChange={this.onChangeAttendees}
            >
              {this.state.all_users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Reservation"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
