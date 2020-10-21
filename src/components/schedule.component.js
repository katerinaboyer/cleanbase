import React, { Component } from "react";
import CurrentSchedule from "./current-schedule.component";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

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
      <div>
        <div style={{ position: "relative", top: "200px", right: "10%" }}>
          <p>{currentDate}</p>
          <Calendar onChange={this.onChange} value={this.state.date} />
          <TimePicker
            onChange={this.onChangeStart}
            value={this.state.startTime}
            clockIcon={null}
            disableClock={true}
            hourPlaceholder={" "}
            minutePlaceholder={" "}
            style={{ position: "absolute" }}
          />
          <p style={{ marginLeft: "15%", position: "absolute" }}>to </p>
          <TimePicker
            onChange={this.onChangeEnd}
            value={this.state.endTime}
            clockIcon={null}
            disableClock={true}
            hourPlaceholder={" "}
            minutePlaceholder={" "}
            style={{ marginLeft: "8%" }}
          />
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
        </div>
        <CurrentSchedule />
        <Card
          style={{
            borderRadius: "1rem",
            width: "50%",
            float: "right",
            marginRight: "25%",
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
        <Card
          style={{
            borderRadius: "1rem",
            width: "50%",
            float: "right",
            marginRight: "25%",
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
        <Card
          style={{
            borderRadius: "1rem",
            width: "50%",
            float: "right",
            marginRight: "25%",
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
      </div>
    );
  }
}