import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./../styles.css";
import axios from "axios";

export default class SanitationSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/reservations/cleaning/unclaimed").then(response => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          reservations: response.data
        });
      }
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            width: "32%",
            float: "right",
            marginRight: "3%",
            marginTop: "20%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>
            Upcoming Schedule
          </h5>
          {this.state.reservations.map(reserv => {
            return (
            <Card className="san-sched">
              <Card.Body className="card-body">
            <ul style={{listStyleType: "none"}}><li>{reserv.title}</li><li>{reserv.start_time} - {reserv.end_time}</li><li>Room: {reserv.room_number} Desk: {reserv.desk_number}</li></ul>
              <Button size="sm" variant="light" style={{marginLeft: "42%"}}>
                Assign
              </Button>
            </Card.Body>
          </Card> )
          })}
        </div>
        <div
          style={{
            width: "32%",
            float: "left",
            marginLeft: "3%",
            marginTop: "20%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>My Schedule</h5>
          <Card>
            <Card.Body className="card-body">
              This is some text within a card body.
              <Button size="sm" variant="light">
                Complete
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="card-body">
              This is some text within a card body.
              <Button size="sm" variant="light">
                Complete
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
