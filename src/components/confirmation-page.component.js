import React, { Component } from "react";
import CurrentSchedule from './current-schedule.component';
import { Button } from "react-bootstrap";

export default class ConfirmationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: "" 
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
      }
    

    render() {
        return (
            <div>
               <div style={{width: '50%', position: 'fixed', marginTop: '10%'}}>
                   <p>Name: </p>
                   <p>Email: </p>
                   <p>Phone: </p>
                   <p>Company: </p>
                   <p>Floor: </p>
                   <p>Desk: </p>
                   <p>Comments:</p>
                   <input
                        type="text"
                        style={{width: '320px', height: '150px', borderRadius: '8%'}}
                        value={this.state.comment}
                        onChange={this.handleChange}
                     />
                     <div style={{marginTop: '2%'}}>
                    <Button style={{borderRadius: '18%'}} variant="secondary" >Cancel</Button>
                    <Button style={{marginLeft: '23%', borderRadius: '18%'}}>Submit</Button>
                    </div>
               </div>
               <CurrentSchedule />
            </div>
        )
    }
}