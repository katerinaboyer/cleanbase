import React, { Component } from "react";
import axios from "axios";
import {Form, Button, Col, Row} from 'react-bootstrap';

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
    this.onChangeFloorId = this.onChangeFloorId.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeRoomType = this.onChangeRoomType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      room_number: "",
      floor_id: "",
      capacity: "",
      room_type: "",
      floors: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/floors/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            floors: response.data.map((floor) => floor),
            floor_id: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeRoomNumber(e) {
    this.setState({
      room_number: e.target.value,
    });
  }

  onChangeFloorId(e) {
      this.setState({
          floor_id: e.target.value
      });
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }

  onChangeRoomType(e) {
    this.setState({
      room_type: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newRoom = {
      room_number: this.state.room_number,
      floor_id: this.state.floor_id,
      capacity: this.state.capacity,
      room_type: this.state.room_type,
    };

    console.log(newRoom);

    axios
      .post("http://localhost:5000/rooms/add", newRoom)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create New Room:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Room Number</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="12A" onChange={this.onChangeRoomNumber}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3}>Floor ID</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeFloorId}>
                    {this.state.floors.map((floor) => {
                return (
                  <option key={floor._id} value={floor._id}>
                    {floor.floor_number}
                  </option>
                );
              })}
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Capacity</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="12" onChange={this.onChangeCapacity}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3}>Floor ID</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeRoomType}>
                      <option value="desk_space">Desk Space</option>
                      <option value="office">Office</option>
                      <option value="conference">Conference</option>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Button className="button-secondary" type="submit">
                Create Room
            </Button>
        </Form>
      </div>
     
    );
  }
}
