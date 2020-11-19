import React, {useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import "./../styles.css";
import axios from "axios";
import {Form, Col, Row} from 'react-bootstrap';
import {format} from "date-fns";

const SanitationSchedule = props => {
  const user = useSelector(getUser);
  
  const [reservation, setReservation] = useState([]);
  const [sanSchedule, setSanSchedule] = useState([]);
  const [value, setValue] = useState(0);
  const currDate = format(new Date(), 'MM/dd');

  const onAssign = (reservationID,roomID, deskID) => {
    console.log("HERE")
    let attendeelist = [];
    let isAvail = false;
    attendeelist[0] = user._id;
    const partialUpdate = {attendees: attendeelist};
    console.log(reservationID)
    const isAvailable = {is_available: isAvail};
    axios.post('http://localhost:5000/desks/update/isavailable/' + deskID,  isAvailable );
    axios.post('http://localhost:5000/rooms/update/isavailable/' + roomID,  isAvailable );
    axios.post('http://localhost:5000/reservations/update/attendees/' + reservationID,  partialUpdate );
    setValue(Math.random() * 1000);
  }

  const onComplete = (reservationID, roomID, deskID) => {
    let isCl = true;
    const isClean = {is_clean: isCl};
     axios.post('http://localhost:5000/desks/update/isclean/' + deskID,  isClean );
     axios.post('http://localhost:5000/rooms/update/isclean/' + roomID,  isClean );
     axios.delete('http://localhost:5000/reservations/delete/' + reservationID);
     setValue(Math.random() * 1000);
  }


  useEffect(() => {
    async function fetchData() {
      axios.get("http://localhost:5000/reservations/cleaning/unclaimed")
      .then(response => {
            console.log(response.data);
          if (response.data.length > 0) {
              setReservation(response.data);
          }
      })
      .catch((error) => {
          console.log(error);
      })
      axios.get("http://localhost:5000/reservations/current/" + user._id)
      .then(response => {
        console.log(response.data);
        // console.log(user);
        if (response.data.length > 0) {
          setSanSchedule(response.data);
        }
    })
    .catch((error) => {
        console.log(error);
    })
  }
  fetchData();
},[value]);

const formatDate = (date) =>{
  return  date.substring(5,7) + '/' + date.substring(8,10);
}

const formatTime = (time) => {

  time = time.split(':'); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
  timeValue= "" + hours;
  } else if (hours > 12) {
  timeValue= "" + (hours - 12);
  } else if (hours === 0) {
  timeValue= "12";
  }
  
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

  return timeValue;
}

  // render() {
    return (
      <div style={{padding: "5% 5% 0% 5%"}}>
        <Row>
          <Col>
            <div style={{paddingTop:"0px"}}>
              <Col style={{paddingRight:"8%"}}>
                  <Row>
                      <Col sm={7} >
                          <h4 style={{paddingLeft:"20px", paddingRight:"0px"}}>Full Schedule</h4>
                      </Col>
                  </Row>
                  <div style={{}}>
                      { reservation.map(info =>
                          <div>
                              <Card style={{borderRadius:"15px", marginBottom: "10px"}}>
                                      <Row>
                                          {info.title.length > 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date) + " - " + info.title}</h5>}
                                          {info.title.length === 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date)}</h5>}
                                      </Row>
                                      <Row>
                                          <Card.Text style={{color:"#434343", padding:"0px 0px 5px 100px"}}>
                                              {"Room: " + info.room_number}
                                          </Card.Text>
                                      </Row>
                                      <Row>
                                          <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                              {"Desk: " + info.desk_number}
                                          </Card.Text>
                                      </Row>
                                      <Row>
                                          <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                              {formatTime(info.start_time) + "-" + formatTime(info.end_time)}
                                          </Card.Text>
                                      </Row>
                                      <Row>
                                          <button className="button-checkin" onClick={() => onAssign(info._id,info.room_id,info.desk_id)}>Assign</button>
                                      </Row>
                              </Card>
                          </div>
                      )
                      }
                  </div>
              </Col>
            </div>
          </Col>
          <Col sm={2}></Col>
          <Col style={{paddingRight:"8%"}}>
                <Row>
                    <Col sm={7} >
                        <h4 style={{paddingLeft:"20px", paddingRight:"0px"}}>Upcoming Schedule</h4>
                    </Col>
                </Row>
                <div style={{}}>
                    { sanSchedule.map(info =>
                        <div>
                            {/* { formatDate(info.date) >= currDate &&  */}
                            <Card style={{borderRadius:"15px", marginBottom: "10px"}}>
                              <Row>
                                  {info.title.length > 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date) + " - " + info.title}</h5>}
                                  {info.title.length === 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date)}</h5>}
                              </Row>
                              <Row>
                                  <Card.Text style={{color:"#434343", padding:"0px 0px 5px 100px"}}>
                                      {"Room: " + info.room_number}
                                  </Card.Text>
                              </Row>
                              <Row>
                                  <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                      {"Desk: " + info.desk_number}
                                  </Card.Text>
                              </Row>
                              <Row>
                                  <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                      {formatTime(info.start_time) + "-" + formatTime(info.end_time)}
                                  </Card.Text>
                              </Row>
                              <Row>
                                  <button className="button-checkin" onClick={() => onComplete(info._id,info.room_id,info.desk_id)}>Complete</button>
                              </Row>
                            </Card>
                            {/* } */}
                        </div>
                    )
                    }
                </div>
            </Col>
        </Row>
      </div>
    );
 // }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  storeLogout
})(SanitationSchedule);

