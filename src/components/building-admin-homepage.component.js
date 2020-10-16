import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import   NavigationBar  from './navbar.component.js';
//import {View} from 'react-native';
import './../styles.css';

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
        axios.get('http://localhost:5000/users/')
          .then(response => {
              if (response.data.length > 0) {
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

          axios.get('http://localhost:5000/buildings/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                      address: response.data[3]
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
                <div>
                    <p className="text" style= {{color:"white"}}>
                        Covid Cases:                Up 27%<br/>
                        General Illness:            Down 12%
                    </p>
                </div>

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