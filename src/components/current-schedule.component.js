import React, { Component } from "react";
import { ListGroup} from 'react-bootstrap';


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
                <h3 style={{color:"white"}}>Upcoming Schedule</h3>
                {
                    this.state.schedule.map(info =>
                        <ListGroup style={{paddingBottom:"10px"}}>
                            <ListGroup.Item style={{}}> <ul style={{listStyle: "none"}}><li>{info.date}</li><li>{`${info.isDesk? 'Desk #' : 'Conference #'}${info.reservationSpace} Floor:${info.floorNumber} ${info.start} - ${info.end}`}</li></ul></ListGroup.Item>
                        </ListGroup>
                     )
                }
            </div>
        );
    }
}
