import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeFloorAssigned = this.onChangeFloorAssigned.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      business_name: '',
      floor_assigned: '',
      floors: [],
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/floors/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    floors: response.data.map(floor => floor),
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })
  }

  onChangeFloorAssigned(e) {
    this.setState({
      floor_assigned: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newAccount = {
        business_name: this.state.business_name,
        floor_assigned: this.state.floor_assigned
    }

    console.log(newAccount);

    axios.post('http://localhost:5000/accounts/add', newAccount)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create Buisness:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Business Name</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="Texas A&M" onChange={this.onChangeBusinessName}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3}>Floor Assigned</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeFloorAssigned}>
                    {
                      this.state.floors.map((floor) => {
                        return (
                        <option key={floor._id} value={floor._id}>
                          {floor.floor_number}
                        </option>
                        )
                      })
                    }  
                    </Form.Control>
                </Col>
            </Form.Group>

            <Button className="button-secondary" type="submit">
                Register Business
            </Button>
        </Form>
      </div>
    )
  }
}