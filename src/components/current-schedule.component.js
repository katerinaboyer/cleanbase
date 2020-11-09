import React, {useState, useEffect } from "react";
import {ListGroup} from 'react-bootstrap';
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";
import {format} from "date-fns";

const CurrentSchedule = (props) => {

    const [schedule, setSchedule] = useState([]);

    const history = useHistory();

    const newReservation = (e) =>{
        history.push("/reservation");
    }
    const currDate = format(new Date(), 'MM/dd');

    const checkIn = (e) => {

    }

    useEffect(() => {
        /*
        async function fetchData() {
            axios.get('http://localhost:5000/accounts/')
            .then(response => {
                //console.log(response.data.length);
                //console.log(response.data);
                if (response.data.length > 0) {
                    setAccounts(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchData();
        */
       async function fetchData() {
            setSchedule(
                [{'date': "11/09", 'reservationSpace': 25, 'floorNumber': 15,'start': 12, end: 2, 'isDesk': true}, 
                {'date': "9/15", 'reservationSpace': 65, 'floorNumber': 8,'start': 1, end: 4,  'isDesk': true}, 
                {'date': "9/30", 'reservationSpace': 5, 'floorNumber': 15,'start': 12, end: 7, 'isDesk': false}, 
                {'date': "9/24", 'reservationSpace': 51, 'floorNumber': 5,'start': 4, end: 3,  'isDesk': true}]
            )
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
                                        <h5 style={{padding:"10px 0px 0px 30px"}}>{info.date}</h5>
                                    </Row>
                                    <Row>
                                        <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                            {`${info.isDesk? 'Desk #' : 'Conference #'}${info.reservationSpace} Floor:${info.floorNumber} ${info.start} - ${info.end}`}
                                        </Card.Text>
                                    </Row>
                                    {info.date === currDate && 
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
