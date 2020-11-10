import React, { Component } from 'react';
import axios from 'axios';
import {Form, Col, Row} from 'react-bootstrap';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeFloorsAssigned = this.onChangeFloorsAssigned.bind(this);
    this.onChangeOfficeManager = this.onChangeOfficeManager.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      business_name: '',
      office_manager: '',
      floors_assigned: '',
      floors: [],
      office_managers: []
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

  onChangeFloorsAssigned(e) {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    this.setState({
      floors_assigned: value
    })
  }

  onChangeOfficeManager(e) {
    this.setState({
      office_manager: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newAccount = {
        business_name: this.state.business_name,
        floors_assigned: this.state.floors_assigned,
        office_manager: this.state.office_manager
    };

    console.log(newAccount);

    axios.post('http://localhost:5000/accounts/add', newAccount)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create Business Account:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3} style={{fontSize:"120%"}}>Business Name</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="Business Name" onChange={this.onChangeBusinessName}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3} style={{fontSize:"120%"}}>Floors Assigned</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" multiple onChange={this.onChangeFloorsAssigned}>
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

            <button className="button-submit" type="submit">
                Create Business
            </button>
        </Form>
      </div>
    )
  }
}