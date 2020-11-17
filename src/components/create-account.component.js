import React, { Component } from "react";
import axios from "axios";
import {Form, Col, Row} from 'react-bootstrap';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeOfficeManager = this.onChangeOfficeManager.bind(this);
    this.onChangeBuildingId = this.onChangeBuildingId.bind(this);
    this.onChangeFloorsAssigned = this.onChangeFloorsAssigned.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      business_name: "",
      office_manager: "",
      building_id: "",
      floors_assigned: [],
      buildings: [],
      floors: [],
      users: []
    };
    this.state.floors_assigned.map((value) => value._id);
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:5000/floors"),
        axios.get("http://localhost:5000/users/role/office_manager"),
        axios.get("http://localhost:5000/buildings")
      ])
      .then(([floorResponse, userResponse, buildingResponse]) => {
        this.setState({
          floors: floorResponse.data.map((floor) => floor),
          users: userResponse.data.map((user) => user),
          buildings: buildingResponse.data.map((building) => building)
        });
      });
  }

  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value,
    });
  }

  onChangeOfficeManager(e) {
    this.setState({
      office_manager: e.target.value,
    });
  }


  onChangeBuildingId(e) {
    this.setState({
      building_id: e.target.value,
    });
  }

  onChangeFloorsAssigned(e) {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({
      floors_assigned: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newAccount = {
      business_name: this.state.business_name,
      office_manager: this.state.office_manager,
      building_id: this.state.building_id,
      floors_assigned: this.state.floors_assigned
    };

    console.log(newAccount);

    axios
      .post("http://localhost:5000/accounts/add", newAccount)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create New Business Account:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formBusinessName">
                <Form.Label column sm={3}>Business Name</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="12A" onChange={this.onChangeBusinessName}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formManager">
                <Form.Label column sm={3}>Office Manager</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeOfficeManager}>
                    {this.state.users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                );
              })}
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formManager">
                <Form.Label column sm={3}>Building Address</Form.Label>
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

            <Form.Group as={Row} controlId="formBasicFloorsAssigned">
            <Form.Label column sm={3}>
              Floors assigned
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                multiple
                onChange={this.onChangeFloorsAssigned}
              >
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

            <button className="button-submit" type="submit">
                Create Account
            </button>
        </Form>
      </div>
     
    );
  }
}
