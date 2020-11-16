import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Col, Row } from "react-bootstrap";
import { connect } from "mongoose";

const CreateBuilding = (props) => {
  const [buildingAdmin, setBuildingAdmin] = useState("");
  const [numFloors, setNumFloors] = useState();
  const [capacity, setCapacity] = useState();
  const [address, setAddress] = useState("");
  const [_id, setId] = useState("");
  const [admins, setAdmins] = useState([]);

  // const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      axios
        .get("http://localhost:5000/users/role/building_admin")
        .then((response) => {
          if (response.data.length > 0) {
            setAdmins(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  async function postFloors(numFloors) {
    const lastBuilding = [];
    axios.get('http://localhost:5000/buildings')
    .then((res) => {
      lastBuilding.push(res.data[res.data.length-1]._id);
      console.log(typeof lastBuilding);
      console.log("buildingi d", lastBuilding[0]);
      for (var i = 0; i < numFloors; i++) {
        const newFloor = {
          floor_number: i+1,
          building_id: lastBuilding[0]
        }
        axios.post('http://localhost:5000/floors/add', newFloor)
        .then((res) => console.log(res.data));
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBuilding = {
      building_admin: buildingAdmin,
      num_floors: numFloors,
      capacity: capacity,
      address: address,
    };

    console.log(newBuilding);

    axios
      .post("http://localhost:5000/buildings/add", newBuilding)
      .then((res) => {
        console.log("response data", res.data);
        postFloors(numFloors);
      })

      // (res) => console.log(res.data),
      //   postFloors(num_floors)
      // get num floors from building object and create that many floor objects for that building id 
    // for rooms need the id of the room put axios in .then()
    // return most recent axios post 
    //array list.length -1 in response 
    // posting room, get request for all rooms and only return the last one 
    
  };

  return (
    <div
      style={{
        marginLeft: "10.5rem",
        display: "block",
        color: "white",
        width: "45%",
      }}
    >
      <h3 className="h3">Create Building:</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formAdmin">
          <Form.Label column sm={3}>
            Building Admin
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              placeholder="Name"
              onChange={e => setBuildingAdmin(e.target.value)}
            >
              {admins.map((admin) => {
                return (
                  <option key={admin._id} value={admin._id}>
                    {admin.name}
                  </option>
                );
              })}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formFloorNumbers">
          <Form.Label column sm={3}>
            Number of Floors
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="numFloors" 
            onChange={e => setNumFloors(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCapacity">
          <Form.Label column sm={3}>
            Capacity
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="capacity" 
            onChange={e => setCapacity(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicAddress">
          <Form.Label column sm={3}>
            Street Address
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="address"
             placeholder="123 Aggie Dr."
              onChange={e => setAddress(e.target.value)} />
          </Col>
        </Form.Group>

        <button className="button-submit" type="submit" onClick={handleSubmit}>
          Create Building
        </button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default CreateBuilding;

// export default connect(mapStateToProps)(CreateBuilding);

// componentDidMount() {
//     axios.get('http://localhost:5000/users/building_admins?role=building_admin', {
//       params: {
//         role: 'building_admin'
//       }
//     })
//       .then(response => {
//           if (response.data.length > 0) {
//               this.setState({
//                   users: response.data.map(user => user),
//                   building_admin: response.data[0]
//               })
//           }
//       })
//       .catch((error) => {
//           console.log(error);
//       })
// }

// on submit, get number of floors and create that many floor objects
// createFloors() {
//   numFloors = this.state.num_floors
//   console.log()
// }

// onSubmit(e) {
//   e.preventDefault();

//   const newBuilding = {
//       _id: this.state.address,
//       building_admin: this.state.building_admin,
//       num_floors: this.state.num_floors,
//       capacity: this.state.capacity,
//       address: this.state.address
//   }

//   console.log(newBuilding);

//   axios.post('http://localhost:5000/buildings/add', newBuilding)
//     .then(res => console.log(res.data));
// }
