import React, { Component } from "react";
import {Form, Col, Row} from 'react-bootstrap';

import "./../styles.css"


export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
                    <h3 className="h3">Personal Info:</h3>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Form.Label column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="name" placeholder="Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPhone">
                            <Form.Label column sm={3}>Phone</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="phone" placeholder="123-456-7890" />
                            </Col>
                        </Form.Group>
                        <button className="button-submit" type="submit">
                            Update
                        </button>
                    </Form>
                </div> 

                <div style={{marginLeft:"10.5rem", paddingTop:"150px", display:"block", color:"white", width:"45%"}} >
                    <h3 className="h3">Company Info:</h3>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicName">
                            <Form.Label column sm={3}>Company Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="name" placeholder="Company Name" readOnly/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>Address</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="address" placeholder="Company Address" readOnly/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPhone">
                            <Form.Label column sm={3}>Role</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="role" placeholder="employee" readOnly/>
                            </Col>
                        </Form.Group>
                    </Form>
                </div> 
            </div>
        );
    }
}