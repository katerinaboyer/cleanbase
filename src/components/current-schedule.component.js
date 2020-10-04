import React, { Component } from "react";
import { ListGroup} from 'react-bootstrap';


export default class CurrentSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: []
        }
    }

    componentDidMount() {
        this.setState({
            schedule: [{'date': "Wednesday 9/12", 'reservationSpace': 25, 'floorNumber': 15,'start': 12, end: 2}, {'date': "Monday 9/15", 'reservationSpace': 65, 'floorNumber': 8,'start': 1, end: 4}, {'date': "Friday 9/30", 'reservationSpace': 5, 'floorNumber': 15,'start': 12, end: 7}, {'date': "Thursday 9/24", 'reservationSpace': 51, 'floorNumber': 5,'start': 4, end: 3}]
        })
    }
    
    
    render() {
        return(
            <div>
                <p>upcoming schedule</p>
                <ListGroup>
                {
                    this.state.schedule.map(info => 
                    <ListGroup.Item style={{width: "45%"}}> <ul><li>{info.date}</li><li>{info.reservationSpace}</li><li>{info.floorNumber}</li><li>{info.start} - {info.end}</li></ul></ListGroup.Item> )
                }
                 </ListGroup>
            </div>
        );
    }
}