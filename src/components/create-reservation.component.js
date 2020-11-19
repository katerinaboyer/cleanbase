import React, { Component } from "react";
import axios from "axios";
import * as emailjs from "emailjs-com";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { Form, Button, Col, Row } from "react-bootstrap";
import ToastMessage from "./toast.component";
import { connect, useSelector } from "react-redux";
import { getUser, getReservation } from "../store/selectors";


const CreateReservation = (props) => {
  const user = useSelector(getUser);
  const reservation = useSelector(getReservation);
  console.log("res", reservation);
  return <FillReservation currUser={user} reservation={reservation} />;
};

function calculateEndCleaning(cleaningStart) {
  var minsToAdd = 30;
  var time = cleaningStart;
  var cleaningEnd = new Date(
    new Date("1970/01/01 " + time).getTime() + minsToAdd * 60000
  ).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return cleaningEnd;
}

class FillReservation extends Component {
  constructor(props) {
    super(props);
    const currUserId = props.currUser._id;
    const currUserEmail = props.currUser.email;
    // console.log(currUserId);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    // this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
    this.onChangeDeskNumber = this.onChangeDeskNumber.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeAttendees = this.onChangeAttendees.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // should initialize attendees[0] with the current signed in user
    this.state = {
      title: "",
      room_id: props.reservation.room_id,
      room_number: props.reservation.room_number,
      desk_id: props.reservation.desk_id,
      desk_number: props.reservation.desk_number,
      start_time: props.reservation.start_time,
      end_time: props.reservation.end_time,
      date: props.reservation.date,
      email: currUserEmail,
      emails: ["thomas.yim.gough@gmail.com", "jon.hillier@me.com"],
      attendees: [],
      rooms: [],
      desks: [],
      all_users: [],
      show_error: false,
      show_success: false,
    };

    // const selectedReservation = {
    //   room_id: props.reservation.room_id,
    //   room_number: props.reservation.room_number,
    //   desk_id: props.reservation.desk_id,
    //   desk_number: props.reservation.desk_number,
    //   start_time: props.reservation.start_time,
    //   end_time: props.reservation.end_time,
    //   date: props.reservation.date
    // }

    this.state.attendees.map((value) => value.currUserId);
  }

  componentDidMount() {
    console.log(this.state.email);
    axios
      .all([
        axios.get("http://localhost:5000/rooms"),
        axios.get("http://localhost:5000/desks"),
        axios.get("http://localhost:5000/users/all"),
      ])
      .then(([roomResponse, deskResponse, userResponse]) => {
        this.setState({
          rooms: roomResponse.data.map((room) => room),
          // room: roomResponse.data[0],
          desks: deskResponse.data.map((desk) => desk),
          // desk: deskResponse.data[0],
          all_users: userResponse.data.map((user) => user),
        });

        
      });

      
      

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  // onChangeRoomNumber(e) {
  //   const roomNumber = e.target.selectedOptions[0].text;
  //   const roomId = e.target.value;
  //   console.log(roomNumber, roomId);
  //   this.setState({
  //     room_number: roomNumber,
  //     room_id: roomId
  //   });
  // }

  onChangeDeskNumber(e) {
    const deskNumber = e.target.selectedOptions[0].text;
    const deskId = e.target.value;
    this.setState({
      desk_number: deskNumber,
      desk_id: deskId,
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
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({
      attendees: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      this.state.title &&
      this.state.room_number &&
      this.state.desk_number &&
      this.state.start_time &&
      this.state.end_time
    ) {
      const newReservation = {
        title: this.state.title,
        room_id: this.state.room_id,
        room_number: this.state.room_number,
        desk_id: this.state.desk_id,
        desk_number: this.state.desk_number,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        date: this.state.date,
        attendees: this.state.attendees,
        checkedIn: false,
      };

      const cleaningReservation = {
        title: "Cleaning",
        room_id: this.state.room_id,
        room_number: this.state.room_number,
        desk_id: this.state.desk_id,
        desk_number: this.state.desk_number,
        start_time: this.state.end_time,
        end_time: calculateEndCleaning(this.state.end_time),
        date: this.state.date,
        checkedIn: false,
      };
      for(var i = 0; i < this.state.attendees.length; i++){
        axios
              .all([
                //from each attendee, we extract their email and place it into an array
                axios.get('http://localhost:5000/users/id/' + this.state.attendees[i])
              ])
              .then(([attendResponse]) => {
               
              if(attendResponse.data.email != null){
                var test = this.state.emails.concat(attendResponse.data.email);
                this.setState({
                  emails: test
                });
                console.log(this.state.emails);
              }
              });
      }
      

    var data = {
      title: this.state.title,
      to_email: this.state.emails,
      room_number: this.state.room_number,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      date: this.state.date,
    };
    //emails a nice confirmation to the user
    emailjs
      .send(
        "service_lsurk9p",
        "template_evr3ddw",
        data,
        "user_YLt0CRcKLOhVbiTOfPMjp"
      )
      .then(
        function (response) {
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
        }
      );

    console.log("new Rservation", newReservation);

      

      console.log(newReservation);

      axios
        .post("http://localhost:5000/reservations/add", newReservation)
        .then((res) => console.log(res.data));

      axios
        .post("http://localhost:5000/reservations/add", cleaningReservation)
        .then((res) => console.log(res.data));

      this.setState({
        show_success: true,
      });
      setTimeout(() => {
        this.setState({
          show_success: false,
        });
      }, 5000);
    } else {
      this.setState({
        show_error: true,
      });
      setTimeout(() => {
        this.setState({
          show_error: false,
        });
      }, 5000);
    }
  }

  render() {
    // const user = useSelector(getUser)
    return (
      <div
        style={{
          marginLeft: "10.5rem",
          display: "block",
          color: "white",
          width: "45%",
        }}
      >
        <h3 className="h3">Create Reservation:</h3>
        <Form noValidate onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formBasicTitle">
            <Form.Label column sm={3}>
              Title
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="name"
                placeholder="Enter name"
                onChange={this.onChangeTitle}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formRoomNumber">
            <Form.Label column sm={3}>
              Room Number
            </Form.Label>
            <Col sm={9}>
              <div>
                <input
                  class="form-control"
                  type="text"
                  value={this.state.room_number}
                  readonly
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDeskNumber">
            <Form.Label column sm={3}>
              Desk Number
            </Form.Label>
            <Col sm={9}>
              <div>
                <input
                  class="form-control"
                  type="text"
                  value={this.state.desk_number}
                  readonly
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicDate">
            <Form.Label column sm={3}>
              Date
            </Form.Label>
            <Col sm={9}>
              <div>
                <input
                  class="form-control"
                  type="text"
                  value={this.state.date}
                  readonly
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicStartTime">
            <Form.Label column sm={3}>
              Start Time
            </Form.Label>
            <Col sm={9}>
              <div>
                <input
                  class="form-control"
                  type="text"
                  value={this.state.start_time}
                  readonly
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicEndTime">
            <Form.Label column sm={3}>
              End Time
            </Form.Label>
            <Col sm={9}>
              <div>
                <input
                  type="text"
                  readonly
                  class="form-control"
                  id="staticEmail"
                  value={this.state.end_time}
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicAttendees">
            <Form.Label column sm={3}>
              Attendees
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                multiple
                onChange={this.onChangeAttendees}
                required
              >
                <option hidden disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
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

          <button
            className="button-submit"
            type="submit"
            onClick={this.onSubmit}
          >
            Create Reservation
          </button>
        </Form>
        <ToastMessage
          show={this.state.show_error}
          error={true}
          text={"Opps, it looks like you didn't fill out the reservation."}
        />
        <ToastMessage
          show={this.state.show_success}
          text={"This reservation has been created."}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CreateReservation);
