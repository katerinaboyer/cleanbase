import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./../styles.css";

export default class SpaceMgmt extends Component {
    constructor(props) {
      super(props);
  
    }

  
    render() {
      return (
        <div>
             <div
          style={{
            width: "28%",
            float: "left",
            marginLeft: "3%",
            marginTop: "7%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>Desks</h5>
          <Card className="space-mgmt">
            <Card.Body className="card-body">
              This is some text within a card body.
              <Button variant="link" style={{float: "right"}}>Edit</Button>
            </Card.Body>
          </Card>
          <Card className="space-mgmt">
            <Card.Body className="card-body">
              This is some text within a card body.
              <Button variant="link" style={{float: "right"}}>Edit</Button>
            </Card.Body>
          </Card>
        </div>
          <div
            style={{
              width: "28%",
              float: "right",
              marginRight: "3%",
              marginTop: "7%"
            }}
          >
             <h5 style={{ color: "white", textAlign: "center" }}>Rooms</h5>
            <Card className="space-mgmt">
              <Card.Body className="card-body">
                This is some text within a card body.
                <Button variant="link" style={{float: "right"}}>Edit</Button>
              </Card.Body>
            </Card>
            <Card className="space-mgmt">
              <Card.Body className="card-body">
                This is some text within a card body.
                <Button variant="link" style={{float: "right"}}>Edit</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
  }