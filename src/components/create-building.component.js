import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class CreateBuilding extends Component {
  constructor(props) {
    super(props);

    this.onChangeBuildingAdmin = this.onChangeBuildingAdmin.bind(this);
    this.onChangeNumFloors = this.onChangeNumFloors.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      building_admin: '',
      num_floors: '',
      capacity: '',
      address: '',
      users: []
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/users/building_admins?role=building_admin', {
        params: {
          role: 'building_admin'
        }
      })
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user),
                    building_admin: response.data[0]
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  onChangeBuildingAdmin(e) {
    this.setState({
      building_admin: e.target.value
    })
  }

  onChangeNumFloors(e) {
      this.setState({
          num_floors: e.target.value
      })
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newBuilding = {
        building_admin: this.state.building_admin,
        num_floors: this.state.num_floors,
        capacity: this.state.capacity,
        address: this.state.address
    }

    console.log(newBuilding);

    axios.post('http://localhost:5000/buildings/add', newBuilding)
      .then(res => console.log(res.data));
  }

  render() {
    return (
        <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
          <h3 className="h3">Create Reservation:</h3>
          <Form onSubmit={this.onSubmit}>
              <Form.Group as={Row} controlId="formAdmin">
                  <Form.Label column sm={3}>Building Admin</Form.Label>
                  <Col sm={9}>
                      <Form.Control as="select" placeholder="Name" onChange={this.onChangeBuildingAdmin}>
                                {
                          this.state.users.map((user) => {
                            return <option
                              key={user._id}
                              value={user._id}>{user.name}
                              </option>;
                          })
                        }
                      </Form.Control>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formFloorNumbers">
                  <Form.Label column sm={3}>Number of Floors</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="numFloors" onChange={this.onChangeNumFloors}/>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formCapacity">
                  <Form.Label column sm={3}>Capacity</Form.Label>
                  <Col sm={9}>
                    <Form.Control type="capacity" onChange={this.onChangeCapacity} />
                  </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicAddress">
                  <Form.Label column sm={3}>Address</Form.Label>
                  <Col sm={9}>
                      <Form.Control type="address" placeholder="123 Aggie Dr." onChange={this.onChangeAddress}/>
                  </Col>
              </Form.Group>

              <Button className="button-secondary" type="submit">
                  Create Building
              </Button>
          </Form>
      </div>
    )
  }
}
