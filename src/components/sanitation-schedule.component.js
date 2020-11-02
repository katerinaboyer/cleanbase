import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./../styles.css";

export default class SanitationSchedule extends Component {
  constructor(props) {
    super(props);
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
        <div
          style={{
            width: "32%",
            float: "left",
            marginLeft: "3%",
            marginTop: "20%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>Full Schedule</h5>
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
