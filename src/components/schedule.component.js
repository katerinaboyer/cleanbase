import React, { Component } from "react";
import CurrentSchedule from "./current-schedule.component";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "./../styles.css";

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      startTime: "10:00",
      endTime: "11:00"
    };
  }

  onChange = date => this.setState({ date });
  onChangeStart = startTime => this.setState({ startTime });
  onChangeEnd = endTime => this.setState({ endTime });

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
                  //position: "relative",
                  //top: "200px",
                  //width: "25%",
                  //marginLeft: "2%"
                }
              }
            >
              <p>{currentDate}</p>
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                className="calender"
              />
              <div>
                <TimePicker
                  onChange={this.onChangeStart}
                  value={this.state.startTime}
                  clockIcon={null}
                  disableClock={true}
                  hourPlaceholder={" "}
                  minutePlaceholder={" "}
                />
                <p style={{ marginLeft: "38%", position: "absolute" }}>to </p>
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
              </div>
              <InputGroup style={{ marginTop: "3%" }}>
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
              </InputGroup>
              <Button>Filter</Button>
            </div>
          </Col>
          <Col xs={5} style={{ paddingTop: "75px" }}>
            <Card
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
            </Card>
          </Col>
          <Col style={{ paddingRight: "50px" }}>
            <CurrentSchedule />
          </Col>
        </Row>
      </Container>
    );
  }
}
