import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";


export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desks: [],
      rooms: [],
      date: new Date(),
      startTime: "10:00",
      endTime: "17:00"
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:5000/rooms/not_desk_spaces"),
        axios.get("http://localhost:5000/desks"),
      ])
      .then(([roomResponse, deskResponse]) => {
        this.setState({
          rooms: roomResponse.data.map((room) => room),
          desks: deskResponse.data.map((desk) => desk),
        });
      });
  }

  onChange = date => this.setState({ date });
  onChangeStart = startTime => this.setState({ startTime });
  onChangeEnd = endTime => this.setState({ endTime });

  render() {
    let dateformat = require("dateformat");
    let currentDate = dateformat(this.state.date, "dddd mmmm d");
    return (
      <Container>
        <Row>
        <Col xs={4}>
          <p>{currentDate}</p>
          <div style={{paddingBottom: "10px"}}>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            className="calender"
          />
          </div>
            <TimePicker
              onChange={this.onChangeStart}
              value={this.state.startTime}
              clockIcon={null}
              disableClock={true}
              hourPlaceholder={" "}
              minutePlaceholder={" "}
            /> to
            <TimePicker
              onChange={this.onChangeEnd}
              value={this.state.endTime}
              clockIcon={null}
              disableClock={true}
              hourPlaceholder={" "}
              minutePlaceholder={" "}
              className="end-time"
              style={{ marginLeft: "8%" }}
            />
        </Col>

        <Col s={12}>
          <Container style={{padding: "1rem"}}>
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
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          Add
                        </Button>
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
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </div>
            ))}
          </Container>
        </Col>

        </Row>
      </Container>
    );
  }
}
