import React, { Component } from "react";
import "./../styles.css"


export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div style={{marginLeft:"10.5rem", display:"block"}} >
                    <h3 className="h3">Personal Info:</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label className="formLabels">
                        Name:
                        <input style={{paddingRight:"10px"}}type="text" value={this.state.value}/>
                        </label>
                        <br/>
                        <label className="formLabels">
                        Email:
                        <input style={{paddingRight:"10px"}}type="text" value={this.state.value}/>
                        </label>
                        <br/>
                        <label className="formLabels">
                        Phone:
                        <input style={{paddingRight:"10px"}}type="text" value={this.state.value}/>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div style={{marginLeft:"10.5rem", marginTop:"3.5rem", color:"white"}}>
                    <h3 className="h3">Company Info:</h3>
                    <p>Company:</p>
                    <p>Role:</p>
                </div>
            </div>
        );
    }
}