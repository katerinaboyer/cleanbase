import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import { Row, Col, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { setAccountId } from "../store/businessAccountReducer";
import { getUser } from "../store/selectors";


const SpaceMgmt = (props) => {

  //const [accounts, setAccounts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [desks, setDesks] = useState([]);
  //setAccounts([]);


  const history = useHistory();
  const user = useSelector(getUser);

  const addDesk = (e) =>{
      history.push("/desk");
  }
  const addRoom = (e) =>{
    history.push("/room");
}
  //const address = "Business Name";

  const test= (info) =>{
    console.log(info);
    history.push("/edit-baccount")

}

const getFloorNumbers = (floors) => {
    const floorNum = [1,2,3];
    const floorText = floorNum[0] + " - " + floorNum[floorNum.length-1];

    return floorText;
}

var tempRooms = [];
var tempDesks= [];

  useEffect(() => {
      async function fetchData() {
          axios.get('http://localhost:5000/accounts/officemanager/' + user._id)
          .then(response => {
              console.log(response.data[0].floors_assigned);
              console.log(response.data[0].business_name);
              for(var i = 0; i < response.data[0].floors_assigned.length; i++){
                axios.get('http://localhost:5000/floors/id/' + response.data[0].floors_assigned[i])
                .then(response => {
                    console.log(response.data);
                    for(var i = 0; i < response.data.room_list.length; i++){
                        axios.get('http://localhost:5000/rooms/id/' + response.data.room_list[i])
                        .then(response => {
                            tempRooms.push(response.data);
                            //setRooms(response.data);
                            console.log(rooms);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        axios.get('http://localhost:5000/desks/byrooom/' + response.data.room_list[i])
                        .then(response => {
                            tempDesks.push(response.data);
                            //setDesks(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
              }
              setRooms(tempRooms);
              setDesks(tempDesks);
          })
          .catch((error) => {
              console.log(error);
          })

      }
      fetchData();
  },[]);

  return (
    <div style={{padding:"30px 8%"}}>
        <Row>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={9}><h3>Desks</h3></Col>
            <Col><button className="button-add" style={{marginLeft: "30%", marginRight: "50px"}} onClick={addDesk}>ADD</button></Col>
          </Row>
          <div style={{}}>
              { desks.map(info =>
                  <div style={{paddingBottom:"20px"}}>
                      <Card style={{borderRadius:"15px"}}>
                              <Row>
                                  <Col sm={3}>
                                      <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}>Floor 1</Card.Title>
                                  </Col>
                                  <Col style={{textAlign: "center"}}>
                                      <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Desk</Card.Text>
                                  </Col>
                                  <Col sm={3} style={{}}>
                                      <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%"}} onClick={() => test(info)}>Edit</button>
                                  </Col>
                              </Row>
                      </Card>
                  </div>
                  )
              }
          </div>
        </Col>
        <Col sm={1}></Col>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={9}><h3>Rooms</h3></Col>
            <Col><button className="button-add" style={{marginLeft:"35%"}} onClick={addRoom}>ADD</button></Col>
          </Row>
          <div style={{}}>
              { rooms.map(info =>
                  <div style={{paddingBottom:"20px"}}>
                      <Card style={{borderRadius:"15px"}}>
                              <Row>
                                  <Col sm={3}>
                                      <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}>Floor</Card.Title>
                                  </Col>
                                  <Col style={{textAlign: "center"}}>
                                      <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Room</Card.Text>
                                  </Col>
                                  <Col sm={3} style={{}}>
                                      <button className="button-edit" style={{marginLeft:"30%", fontSize:"130%"}}onClick={() => test(info)}>Remove</button>
                                  </Col>
                              </Row>
                      </Card>
                  </div>
                  )
              }
          </div>
        </Col>
        </Row>
    </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
setAccountId
})(SpaceMgmt);