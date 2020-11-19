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
  const [value, setValue] = useState(0);
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

  const test= (info) =>{
    console.log(info);
    history.push("/edit-baccount")

}

const getFloorNumbers = (floors) => {
    console.log(floors)
    var num;
    axios.get("http://localhost:5000/floors/id/" + floors)
    .then((response) => {
        num = response.data.floor_number
        setFloorNum(num);
    })
    .catch((error) => {
        return "NULL";
    })
    return floorNum;
}

const getDeskFloorNumbers = (room) => {
    axios.get("http://localhost:5000/desks/id/" + room)
    .then((response) => {
        return getFloorNumbers(response.data.floor_id);
    })
    .catch((error) => {
        return "NULL";
    })
    setValue(room.length);
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
        console.log(tempDesks);
        console.log(tempRooms);
        setDesks(tempDesks)
        setRooms(tempRooms)
    }

    fetchData();
  },[]);

  return (
    <div style={{padding:"30px 8%"}}>
        <Row>
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
                                {/* <Col sm={3}>
                                    <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}></Card.Title>
                                </Col> */}
                                <Col style={{textAlign: "center"}}>
                                    <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Desk {info.desk_number}</Card.Text>
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
            <Col><button className="button-add" style={{marginLeft:"35%"}} onClick={addRoom}>Add</button></Col>
          </Row>
          <div style={{}}>
            { rooms.map(info =>
                <div style={{paddingBottom:"20px"}}>
                    <Card style={{borderRadius:"15px"}}>
                        <Row>
                            {/* <Col sm={3}>
                                <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}></Card.Title>
                            </Col> */}
                            <Col style={{textAlign: "center"}}>
                                <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Room: {info.room_number}</Card.Text>
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
