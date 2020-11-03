import React, { Component } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";

export default class BuildingAdminDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            building_admin: '',
            num_floors: '',
            capacity: '',
            address: '',
            users: [],
          }
    
    }


    componentDidMount() {
        console.log("HI");
        axios.get('http://localhost:5000/acounts/')
          .then(response => {
              console.log(response.data.length);
              if (response.data.length > 0) {
                  console.log("here");
                  this.setState({
                      users: response.data.map(user => user),
                      building_admin: response.data[0]._id
                      //get office managers and then create list with their company names and their floor numbers
                  })
              }
          })
          .catch((error) => {
              console.log(error);
          })

    }

    render() {
        return (
            <div className="wrapper">

                <IllnessReport/>

                <div style= {{position:"absolute", right:"350px", color:"white"}}>
                    {this.state.address}
                    <br/>
                    <div className="wrapper" style={{padding: "0px"}}>
                        Filter by: 
                        <button className="button-secondary" style={{background: "white"}}>Floors</button>
                        <button className="button-secondary">Add</button>
                    </div>
                    {this.state.users.map(user =>
                        <button className="button">
                            <strong>{user.email}</strong>
                            <br/><br/>
                            hello
                        </button>)}
                    
                </div>
            </div>
        )
    }
}