import React, { Component } from "react";
import axios from "axios";
import CurrentSchedule from "./current-schedule.component";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//import TimePicker from "react-bootstrap-time-picker";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "./../styles.css";

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desks: [],
      rooms: [],
      date: new Date(),
      startTime: "10:00",
      endTime: "17:00",
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:5000/rooms"),
        axios.get("http://localhost:5000/desks"),
      ])
      .then(([roomResponse, deskResponse]) => {
        this.setState({
          rooms: roomResponse.data.map((room) => room),
          desks: deskResponse.data.map((desk) => desk),
        });
      });
  }

  // = (date) => this.setState({ date });
  // onChangeStart = (startTime) => this.setState({ startTime });
  // onChangeEnd = (endTime) => this.setState({ endTime });

  // on change date get reservations where date == selected_date 
  // remove rooms and desks that are present in that resulting array 
  onChangeDate() {
    // query reservations 
  }

  // get start and end time
  // invalid reservations will have start times 
  onChangeStart() {
    
  }

  onChangeEnd() {

  }

  onSelectDesk() {
    // get desks
  }

  onSelectOffice(e){
    // get room_type == office
    axios.get("http://localhost:5000/rooms/room_type/office")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            rooms: response.data.map(room => room)
          })
        }
      })
  }

//   componentDidMount() {
//     axios.get('http://localhost:5000/users/building_admins?role=building_admin', {
//       params: {
//         role: 'building_admin'
//       }
//     })
//       .then(response => {
//           if (response.data.length > 0) {
//               this.setState({
//                   users: response.data.map(user => user),
//                   building_admin: response.data[0]
//               })
//           }
//       })
//       .catch((error) => {
//           console.log(error);
//       })
// }

  onSelectConference() {
    // get room_type == conference
  }

  render() {
    let dateformat = require("dateformat");
    let currentDate = dateformat(this.state.date, "dddd mmmm d");
    return (
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: "75px" }}>
            <div
              style={
                {
                  padding: "5px"
                }
              }
            >
              <p>{currentDate}</p>
              <Calendar
                onChange={this.onChangeDate}
                value={this.state.date}
                className="calendar"
              />
              {/* <div style={{padding: "10px"}}> */}
                {/* <TimePicker
                  onChange={this.onChangeStart}
                  value={this.state.startTime}
                  step={60}
                  style={{ width: "50%" }}
                />
                <TimePicker
                  onChange={this.onChangeEnd}
                  value={this.state.endTime}
                  step={60}
                  style={{ width: "50%"}}
                />
                </div> */}
              <div class="custom-control custom-checkbox" style={{color: "white"}}>
                <input type="checkbox" class="custom-control-input" id="desk" />
                <label class="custom-control-label" for="desk">Desk</label>
              </div>
              <div class="custom-control custom-checkbox" style={{color: "white"}}>
                <input type="checkbox" class="custom-control-input" id="office" onChange={this.onSelectOffice}/>
                <label class="custom-control-label" for="office">Office</label>
              </div>
              <div class="custom-control custom-checkbox" style={{color: "white"}}>
                <input type="checkbox" class="custom-control-input" id="conference" />
                <label class="custom-control-label" for="conference">Conference Room</label>
              </div>
              {/* <InputGroup style={{ marginTop: "3%" }}>
                <InputGroup.Prepend>
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup.Prepend>
                <p>Desks</p>
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup.Prepend>
                <p>Conference Room</p>
              </InputGroup> */}
              <Button>Filter</Button>
            </div>
          </Col>
          <Col s={12}>
            <Container style={{ padding: "1rem" }}>
              {this.state.desks.map((desk, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <Card style={{ width: "19rem", padding: ".5rem" }}>
                    <Card.Title>Desk: {desk.desk_number}</Card.Title>
                    <Container>
                      <Row>
                        <Col>Floor #</Col>
                        <Col>Room #</Col>
                        <Col>
                        <Link to="/confirm" style={{ float: "right" }}>
                  ADD
                </Link>
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                </div>
              ))}

              {this.state.rooms.map((room, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <Card style={{ width: "19rem", padding: ".5rem" }}>
                    <Card.Title>Room: {room.room_number}</Card.Title>
                    <Container>
                      <Row>
                        <Col>{room.room_type}</Col>
                        <Col>Floor #</Col>
                        <Col>
                        <Link to="/confirm" style={{ float: "right" }}>
                  ADD
                </Link>
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                </div>
              ))}
            </Container>
          </Col>
          {/* <Col xs={5} style={{ paddingTop: "75px" }}> */}
            {/* <Card
              style={{
                borderRadius: "1rem",
                width: "90%",
                float: "right",
                marginRight: "10%",
                marginBottom: "1%"
              }}
            >
              <Card.Body>
                This is some text within a card body.
                <Link to="/confirm" style={{ float: "right" }}>
                  ADD
                </Link>
              </Card.Body>
            </Card> */}
          {/* </Col> */}
          <Col style={{ paddingRight: "50px" }}>
            <CurrentSchedule />
          </Col>
        </Row>
      </Container>
    );
  }
}