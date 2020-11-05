import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default class SanitationRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cleanRequest: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ cleanRequest: event.target.value });
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: "50%",
            position: "fixed",
            marginTop: "10%",
            color: "white",
            marginLeft: "3%"
          }}
        >
          <p>Name: </p>
          <p>Email: </p>
          <p>Phone: </p>
          <p>Company: </p>
          <p>Floor: </p>
          <p>Cleaning Request:</p>
          <input
            type="text"
            style={{ width: "320px", height: "150px", borderRadius: "8%" }}
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <div style={{ marginTop: "2%" }}>
            <Button style={{ borderRadius: "18%" }} variant="secondary">
              Cancel
            </Button>
            <Button style={{ marginLeft: "23%", borderRadius: "18%" }}>
              Submit
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "32%",
            float: "right",
            marginRight: "3%",
            marginTop: "20%"
          }}
        >
          <Card>
            <Card.Body className="card-body">
              This is some text within a card body.
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="card-body">
              This is some text within a card body.
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
