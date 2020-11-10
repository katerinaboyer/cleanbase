import React, { Component } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import {Form, Col, Row} from 'react-bootstrap';
import {format} from "date-fns";

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

  onChangeStartTime(e) {
    this.setState({
      start_time: e.target.value,
    });
  }

  onChangeEndTime(e) {
    this.setState({
      end_time: e.target.value,
    });
  }

  onChangeDate(e) {

    this.setState({
      date: e.target.value,
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
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
          <h3 className="h3">Create Reservation:</h3>
          <Form onSubmit={this.onSubmit}>
              <Form.Group as={Row} controlId="formBasicTitle">
                  <Form.Label column sm={3}>Title</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="name" placeholder="Name" onChange={this.onChangeTitle}/>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formRoomNumber">
                  <Form.Label column sm={3}>Room Number</Form.Label>
                  <Col sm={9}>
                      <Form.Control as="select" onChange={this.onChangeRoomNumber}>
                        {this.state.rooms.map((room) => {
                          return (
                            <option key={room._id} value={room._id}>
                              {room.room_number}
                            </option>
                          );
                        })}
                      </Form.Control> 
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formDeskNumber">
                  <Form.Label column sm={3}>Desk Number</Form.Label>
                  <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeDeskNumber}>
                      {this.state.desks.map((desk) => {
                        return (
                          <option key={desk._id} value={desk._id}>
                            {desk.desk_number}
                          </option>
                        );
                      })}
                    </Form.Control> 
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicDate">
                  <Form.Label column sm={3}>Date</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="date" placeholder="11/2/2020" onChange={this.onChangeDate}/>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicStartTime">
                  <Form.Label column sm={3}>Start Time</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="time" placeholder="8:30 AM" onChange={this.onChangeStartTime}/>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicEndTime">
                  <Form.Label column sm={3}>End Time</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="time" placeholder="9:30 AM" onChange={this.onChangeEndTime}/>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicAttendees">
                <Form.Label column sm={3}>Attendees</Form.Label>
                <Col sm={9}>
                <Form.Control as="select" multiple onChange={this.onChangeAttendees}>
                      {this.state.all_users.map((user) => {
                        return (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        );
                      })}
                    </Form.Control> 
                </Col>
              </Form.Group>

              {/* <div className="form-group">
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
          </div> */}

              <button className="button-submit" type="submit">
                  Create Reservation
              </button>
          </Form>
      </div> 
    );
  }
}
