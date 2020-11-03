import React, { Component } from "react";
import axios from "axios";
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class CreateFloor extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloorNumber = this.onChangeFloorNumber.bind(this);
    this.onChangeBuildingId = this.onChangeBuildingId.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      floor_number: "",
      building_id: "",
      capacity: "",
      buildings: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/buildings/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            buildings: response.data.map((building) => building),
            building_id: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeFloorNumber(e) {
    this.setState({
      floor_number: e.target.value,
    });
  }

  onChangeBuildingId(e) {
      this.setState({
          building_id: e.target.value
      })
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newFloor = {
      floor_number: this.state.floor_number,
      building_id: this.state.building_id,
      capacity: this.state.capacity,
    };

    console.log(newFloor);

    axios
      .post("http://localhost:5000/floors/add", newFloor)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
            <h3 className="h3">Create Reservation:</h3>
            <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                    <Form.Label column sm={3}>Floor Number</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="name" placeholder="" onChange={this.onChangeFloorNumber}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formFloorNumbers">
                    <Form.Label column sm={3}>Building ID</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="select" onChange={this.onChangeBuildingId}>
                        {this.state.buildings.map((building) => {
                return (
                  <option key={building._id} value={building._id}>
                    {building.address}
                  </option>
                );
              })}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAdmin">
                    <Form.Label column sm={3}>Capacity</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="name" placeholder="" onChange={this.onChangeCapacity}/>
                    </Col>
                </Form.Group>

                <Button className="button-secondary" type="submit">
                    Create Desk
                </Button>
            </Form>
          </div>
    );
  }
}
