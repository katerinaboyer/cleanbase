import React, { Component } from "react";
import CurrentSchedule from './current-schedule.component';


export default class Schedule extends Component {
    render() {
        return(
            <div>
                <p>this is the schedule</p>
                <CurrentSchedule />
            </div>
        );
    }
}