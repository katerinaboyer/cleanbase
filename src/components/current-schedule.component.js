import React, { Component } from "react";
import {ListGroup} from 'react-bootstrap';
import { Container, Row, Col, Form, Card} from 'react-bootstrap';


export default class CurrentSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: [],
            isDesk: false,
        }
    }

    componentDidMount() {
        this.setState({
            schedule: [{'date': "Wednesday 9/12", 'reservationSpace': 25, 'floorNumber': 15,'start': 12, end: 2, 'isDesk': true}, {'date': "Monday 9/15", 'reservationSpace': 65, 'floorNumber': 8,'start': 1, end: 4,  'isDesk': true}, {'date': "Friday 9/30", 'reservationSpace': 5, 'floorNumber': 15,'start': 12, end: 7, 'isDesk': false}, {'date': "Thursday 9/24", 'reservationSpace': 51, 'floorNumber': 5,'start': 4, end: 3,  'isDesk': true}]
        })
    }

    render() {
        return(
            <div style={{paddingTop:"0px"}}>
                <Col style={{paddingRight:"8%"}}>
                        <Row>
                        <h3 style={{paddingLeft:"20px", paddingRight:"0px"}}>Upcoming Schedule</h3>
                        <button className="button-createreservation" >Create Reservation</button>
                        </Row>
                        <div style={{}}>
                            { this.state.schedule.map(info =>
                                <div style={{paddingBottom:"10px"}}>
                                    <Card style={{borderRadius:"15px"}}>
                                            <Row>
                                                <Col sm={3} style={{backgroundColor:"red"}}>
                                                    <Card.Title style={{padding:"20px 0px 20px 25px"}}>{info.date}</Card.Title>
                                                </Col>
                                                <Col style={{textAlign: "center", backgroundColor:"yellow"}}>
                                                    <Card.Text style={{color:"#434343", padding:"25px 0px 20px 0%"}}>{`${info.isDesk? 'Desk #' : 'Conference #'}${info.reservationSpace} Floor:${info.floorNumber} ${info.start} - ${info.end}`}</Card.Text>
                                                </Col>
                                            </Row>
                                    </Card>
                                </div>
                                )
                            }
                        </div>
                    </Col>
            </div>
        );
    }
}
