import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./../styles.css";

export default class UserSanitation extends Component {
  render() {
    return (
      <div>
        <div style={{ color: "white" }}>
          <h3>Cleaning procedures:</h3>
          <p>- Desks are cleaned after use </p>
          <p>- Floors are fogged twice weekly</p>
          <p>- High touch surfaces are sanitized daily</p>
          <p style={{ textIndent: "40px" }}>- Door knobs</p>
          <p style={{ textIndent: "40px" }}>- Elavator buttons</p>
          <p style={{ textIndent: "40px" }}>- Vending machines </p>
        </div>
        <div style={{ width: "32%", float: "right", marginRight: "3%" }}>
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
          <Link to="/sanitationRequest" style={{ marginLeft: "37%" }}>
            Request Cleaning
          </Link>
        </div>
      </div>
    );
  }
}
