import React, { Component } from "react";
import CurrentSchedule from './current-schedule.component';
import { UserContext } from '../App';


export default class Schedule extends Component {
  render() {
    return(
      <UserContext.Consumer>
        {({user, isAuth, setUser}) => {
          return (
            <>
              <p>this is the schedule</p>
              <CurrentSchedule />
            </>
          )
        }}
      </UserContext.Consumer>
    );
  }
}
