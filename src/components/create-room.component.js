import React, {useState, useEffect, Component} from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {Form, Col, Row} from 'react-bootstrap';
import { getUser } from "../store/selectors";
import ToastMessage from './toast.component';

const CreateRoom = (props) => {
  const [room_number, setRoomNumber] = useState();
  const [floor_id, setFloorId] = useState();
  const [floor_number, setFloorNumber] = useState();
  const [capacity, setCapacity] = useState();
  const [room_type, setRoomType] = useState();
  const [floors, setFloors] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  var floorID = "";
  const user = useSelector(getUser);

  useEffect(() =>{
    setRoomType("desk_space")

    var temp = [];

    async function fetchData() {
        axios.get("http://localhost:5000/accounts/office/" + user._id)
      .then((response) => {
          for(var j = 0; j < response.data[0].floors_assigned.length; j++){
            axios.get("http://localhost:5000/floors/id/" + response.data[0].floors_assigned[j])
            .then((response) => {
              console.log(response.data);
              if (response.data !== null) {
                temp.push(response.data)
                setFloorId(response.data._id);
                floorID = response.data._id;
              }
            })
            .catch((error) => {
              console.log(error);
            });
          }
          setFloors(temp);
      });
    }
    fetchData();
  },[]);

  const onChangeRoomNumber= (e) => {
    setRoomNumber(e.target.value);
  }

  const onChangeFloorId = (e) => {
    setFloorId(e.target.value)
    const floorNumber = e.target.selectedOptions[0].text;
    console.log(" text", e.target.selectedOptions[0].text);
    setFloorNumber(floorNumber)
  }

  const onChangeCapacity= (e) => {
    setCapacity(e.target.value)
  }

  const onChangeRoomType = (e) => {
    setRoomType(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      room_number &&
      capacity &&
      room_type
    ) {
      const newRoom = {
        room_number: room_number,
        floor_number: floor_number,
        floor_id: floor_id,
        capacity: capacity,
        room_type: room_type,
      };
      console.log(newRoom);

      var tempRooms = [];
      console.log(newRoom)

      for(var i = 0; i < floors.length; i++){
        if(floors[i]._id === floor_id._id){
          tempRooms = floors[i].room_list;
        }
      }

      console.log(tempRooms);

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
            console.log(floorID);
          });
        });
      setShowSuccess(true);
      setTimeout(() => {setShowSuccess(false)}, 5000);
    } else {
      setShowError(true);
      setTimeout(() => {setShowError(false)}, 5000);
    }
  }

  return (
    <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
      <h3 className="h3">Create New Room:</h3>
      <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="formAdmin">
              <Form.Label column sm={3}>Room Number</Form.Label>
              <Col sm={9}>
                  <Form.Control type="name" placeholder="Enter room number" onChange={onChangeRoomNumber}/>
              </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAdmin">
              <Form.Label column sm={3}>Capacity</Form.Label>
              <Col sm={9}>
                  <Form.Control type="name" placeholder="Enter capacity" onChange={onChangeCapacity}/>
              </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formFloorNumbers">
              <Form.Label column sm={3}>Room Type</Form.Label>
              <Col sm={9}>
                  <Form.Control as="select" onChange={onChangeRoomType}>
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
                  <Form.Control as="select" onChange={onChangeFloorId}>
                    <option hidden disabled selected value> -- select an option -- </option>
                    {floors.map((floor) => {
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
      <ToastMessage show={showError} error={true} text={"Opps, it looks like you didn't fill out the form."} />
      <ToastMessage show={showSuccess} text={`This room has been created.`} />
    </div>

  );

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(CreateRoom);