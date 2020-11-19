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
  const [value, setValue] = useState(true);
  const [anotherVal, setAVal] = useState(true);
  const [floorNum, setFloorNum] = useState();
  //setAccounts([]);
  const user = useSelector(getUser);

  const history = useHistory();

  const addDesk = (e) =>{
      history.push("/desk");
  }
  const addRoom = (e) =>{
    history.push("/room");
}
  //const address = "Business Name";

    const removeDesk = (info) =>{

        axios.get("http://localhost:5000/reservations/deskId/" + info._id)
        .then(res => {
            for(var i = 0; i < res.data.length; i++){
                axios.delete("http://localhost:5000/reservations/delete/" + res.data[i]._id)
                .then(res => console.log(res))
            }
        })

        axios.delete("http://localhost:5000/desks/remove/" + info._id)
        .then(res => console.log(res))


        setValue(!value);
    }
    
    const removeRoom = (info) =>{
        axios.get("http://localhost:5000/desks/byroom/" + info._id)
        .then((res)=> {
            for(var i = 0; i < res.data.length; i++){
                axios.delete("http://localhost:5000/desks/remove/" + res.data[i]._id)
                .then(res => console.log(res))
            }
            axios.delete("http://localhost:5000/rooms/remove/" + info._id)
            .then(res => console.log(res))
        })
        setAVal(!anotherVal);
    }

const roomType = (room) => {
    if(room === "conference"){
        return "Conference Room "
    } else if (room === "office"){
        return "Office "
    } else if (room === "desk_space"){
        return "Desk Space "
    }
}

useEffect(() => {
    async function fetchData() {
        var tempRooms = [];
        var tempDesks= [];
        const floorsAssigned = await axios.get('http://localhost:5000/accounts/office/' + user._id);
        //console.log(floorsAssigned.data[0].floors_assigned);
        for(var i = 0; i < floorsAssigned.data[0].floors_assigned.length; i++){
            //console.log(floorsAssigned.data[0].floors_assigned[i]);
            const roomsData = await axios.get('http://localhost:5000/rooms/floorId/' + floorsAssigned.data[0].floors_assigned[i])
            for(var j = 0; j < roomsData.data.length; j++){
                //tempRooms = rooms;
                tempRooms.push(roomsData.data[j])
            }
        }
        //setRooms(tempRooms)
        for(var i = 0; i < tempRooms.length; i++){
            //console.log(tempRooms[i]._id)
            const desksData = await axios.get('http://localhost:5000/desks/byroom/' + tempRooms[i]._id);
            //console.log(desks.data)
            for(var j = 0; j < desksData.data.length; j++){
                //console.log(desks.data[j])
                //tempDesks = desks;
                tempDesks.push(desksData.data[j]);
                //setDesks(tempDesks);
            }
        }
        //console.log(tempDesks);
        //console.log(tempRooms);
        setDesks(tempDesks)
        setRooms(tempRooms)
    }

    fetchData();
  },[value, anotherVal]);

  return (
    <div style={{padding:"30px 8%"}}>
        <Row>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={7}><h3>Rooms</h3></Col>
            <Col><button className="button-add" style={{marginLeft:"50%"}} onClick={addRoom}>Add Rooms</button></Col>
            <Col><button className="button-add" style={{marginLeft: "0px"}} onClick={addDesk}>Add Desks</button></Col>
          </Row>
          <div style={{}}>
            { rooms.map(info =>
                <div style={{paddingBottom:"20px"}}>
                    <Card style={{borderRadius:"15px"}}>
                        <Row>
                            {/* <Col sm={3}>
                                <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}></Card.Title>
                            </Col> */}
                            <Col style={{paddingLeft: "5%"}}>
                                <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>{roomType(info.room_type)} {info.room_number}</Card.Text>
                            </Col>
                            <Col sm={3} style={{}}>
                                <button className="button-edit" style={{marginLeft:"30%", fontSize:"130%"}}onClick={() => removeRoom(info)}>Remove</button>
                            </Col>
                        </Row>
                        { desks.map(information => 
                  <div style={{paddingBottom:"0px"}}>
                      { info.room_number === information.room_number &&
                      <Card style={{borderRadius:"15px", marginBottom: "10px", marginLeft: "50px",marginRight: "50px", borderColor:"#ee6c4d", borderWidth:"5px"}}>
                            <Row>
                                {/* <Col sm={3}>
                                    <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}></Card.Title>
                                </Col> */}
                                <Col style={{paddingLeft:"5%"}}>
                                    <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Desk: {information.desk_number}<br/> Room: {information.room_number}</Card.Text>
                                </Col>
                                <Col sm={3} style={{}}>
                                    <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%",}} onClick={() => removeDesk(information)}>Remove</button>
                                </Col>
                            </Row>
                        </Card> }
                  </div>
                  )
              }
                    </Card>
                </div>
                
                )
            }
          </div>
        </Col>
        {/* <Col sm={1}></Col>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={9}><h3>Desks</h3></Col>
            <Col><button className="button-add" style={{marginLeft: "30%", marginRight: "50px"}} onClick={addDesk}>Add</button></Col>
          </Row>
          <div style={{}}>
              { desks.map(info =>
                  <div style={{paddingBottom:"20px"}}>
                      <Card style={{borderRadius:"15px"}}>
                            <Row>
                                <Col style={{textAlign: "center"}}>
                                    <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Desk: {info.desk_number}<br/> Room: {info.room_number}</Card.Text>
                                </Col>
                                <Col sm={3} style={{}}>
                                    <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%"}} onClick={() => removeDesk(info)}>Remove</button>
                                </Col>
                            </Row>
                      </Card>
                  </div>
                  )
              }
          </div>
        </Col> */}
        </Row>
    </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
setAccountId
})(SpaceMgmt);
