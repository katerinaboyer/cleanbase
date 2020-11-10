import React, {useState, useEffect } from "react";
import {ListGroup} from 'react-bootstrap';
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {format} from "date-fns";
import { getUser } from "../store/selectors";
import axios from "axios";

const CurrentSchedule = (props) => {

    const [schedule, setSchedule] = useState([]);

    const history = useHistory();
    const user = useSelector(getUser);

    const newReservation = (e) =>{
        history.push("/reservation");
    }
    const currDate = format(new Date(), 'MM/dd');

    const checkIn = (e) => {

    }

    const formatDate = (date) =>{
        return  date.substring(5,7) + '/' + date.substring(8,10);
    }

    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/reservations/userId/' + user._id)
            .then(response => {
                //console.log(response.data.length);
                console.log(response.data);
                if (response.data.length > 0) {
                    setSchedule(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchData();
    },[]);

    return(
        <div style={{paddingTop:"0px"}}>
            <Col style={{paddingRight:"8%"}}>
                <Row>
                    <Col sm={7} >
                        <h4 style={{paddingLeft:"20px", paddingRight:"0px"}}>Upcoming Schedule</h4>
                    </Col>
                    <Col >
                        <button className="button-createreservation" onClick={newReservation}>Create Reservation</button>
                    </Col>
                </Row>
                <div style={{}}>
                    { schedule.map(info =>
                        <div style={{paddingBottom:"10px"}}>
                            <Card style={{borderRadius:"15px"}}>
                                    <Row>
                                        <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date)}</h5>
                                        <p style={{color:"#434343", padding:"10px 0px 0px 10px"}}>{info.title}</p>
                                    </Row>
                                    <Row>
                                        <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                            {"Room: " + info.room_number + " Desk: " + info.desk_number}
                                        </Card.Text>
                                    </Row>
                                    {formatDate(info.date) === currDate && 
                                    <Row>
                                        <button className="button-checkin" onClick={checkIn}>Check In</button>
                                    </Row>
                                    }
                            </Card>
                        </div>
                        )
                    }
                </div>
            </Col>
        </div>
    )

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(CurrentSchedule);
