import React, { Component } from "react";
import CurrentSchedule from './current-schedule.component';
import Card from 'react-bootstrap/Card'


export default class Schedule extends Component {
    render() {
        return(
            <div>
                <p>this is the schedule</p>
                <CurrentSchedule />
                <Card style={{borderRadius:"1rem", width: "50%"}}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
            </div>
        );
    }
}