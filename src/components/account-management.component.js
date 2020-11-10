import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./../styles.css";


export default class AccountMgmt extends Component {
    constructor(props) {
        super(props);
    
      }

    render() {
        return(
            <div
            style={{
              width: "80%",
              float: "left",
              marginLeft: "3%",
              marginTop: "7%",
              marginBottom: "2%"
            }}
          >
            <h5 style={{ color: "white", textAlign: "left" }}>Filter by: Employees</h5>
            <Card style={{height: '4rem', marginBottom: "2%"}}>
              <Card.Body className="card-body">
                This is some text within a card body.
                <Button variant="link" style={{float: 'right'}}>Edit</Button>
              </Card.Body>
            </Card>
            <Card style={{height: '4rem', marginBottom: "2%"}}>
              <Card.Body className="card-body">
                This is some text within a card body.
                <Button variant="link" style={{float: 'right'}}>Edit</Button>
              </Card.Body>
            </Card>
            <Link to="/addEmployee" style={{marginLeft: "45%"}}>Add Employee</Link>
          </div>
        );
    }
}