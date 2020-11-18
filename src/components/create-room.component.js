import React, {useState, useEffect, Component} from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {Form, Col, Row} from 'react-bootstrap';
import { getUser } from "../store/selectors";
import ToastMessage from './toast.component';


const CreateRoom = (props) => {
  const user = useSelector(getUser);

  return(<RoomForm user={user}/>)

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(CreateRoom);

class RoomForm extends Component {
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
      room_type: "desk_space",
      floors: [],
      show_error: false,
      show_success: false,
      user: props.user._id
    };
  }

  componentDidMount() {
      axios.get("http://localhost:5000/floors/")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            floors: res.data.map((floor) => floor),
            floor_id: res.data[0],
          });
          console.log(this.state.floors);
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

    if (
      this.state.room_number &&
      this.state.floor_id &&
      this.state.capacity &&
      this.state.room_type
    ) {
      const newRoom = {
        room_number: this.room_number,
        floor_id: this.floor_id,
        capacity: this.capacity,
        room_type: this.room_type,
      };
  
      var tempRooms = [];
      /*
      for(var i = 0; i < this.floors.length; i++){
        if(this.floors[i]._id === this.floor_id._id){
          tempRooms = this.floors[i].room_list;
        }
      }*/
  
      console.log(newRoom);
  
      axios.post("http://localhost:5000/rooms/add", newRoom)
        .then((res) => {
          console.log(res.data);
          axios.get('http://localhost:5000/rooms/')
          .then((res) => {
            tempRooms.push(res.data[res.data.length-1]._id);
            const updateFloor = {
              room_list: tempRooms
            };
            console.log(updateFloor);
            axios.post('http://localhost:5000/floors/update/' + this.floor_id, updateFloor)
            .then((res) => console.log(res.data));
          });
        });

        this.setState({
          show_success: true
        });
        setTimeout(() => {this.setState({
          show_success: false
        })}, 5000);
    } else {
      this.setState({
        show_error: true
      });
      setTimeout(() => {this.setState({
        show_error: false
      })}, 5000);
    }
  }

  render() {
    return (
      <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Create New Room:</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Room Number</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="Enter room number" onChange={this.onChangeRoomNumber}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAdmin">
                <Form.Label column sm={3}>Capacity</Form.Label>
                <Col sm={9}>
                    <Form.Control type="name" placeholder="Enter capacity" onChange={this.onChangeCapacity}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3}>Room Type</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeRoomType}>
                      <option hidden disabled selected value> -- select an option -- </option>
                      <option value="desk_space">Desk Space</option>
                      <option value="office">Office</option>
                      <option value="conference">Conference</option>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFloorNumbers">
                <Form.Label column sm={3}>Floor Number</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" onChange={this.onChangeFloorId}>
                    <option hidden disabled selected value> -- select an option -- </option>
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
                Create Room
            </button>
        </Form>
        <ToastMessage show={this.state.show_error} error={true} text={"Opps, it looks like you didn't fill out the form."} />
        <ToastMessage show={this.state.show_success} text={`This room has been created.`} />
      </div>

    );
  }
}
