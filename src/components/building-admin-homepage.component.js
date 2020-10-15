import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import   NavigationBar  from './navbar.component.js';
import './../styles.css';

export default class BuildingAdminDash extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),
            date = today.getFullYear() + "-" + (today.getMonth()) + "-" + today.getDate();

        this.state = {
            building_admin: '',
            num_floors: '',
            capacity: '',
            address: 'aaaaaaaa',
            users: [],
            date: date
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
    }
   checkIn = () =>{
    this.setState({address: "hello"});
   };

    render() {
        return (
            <div>
                <div>
                    <p style= {{color:"white"}}>
                        {this.state.address}
                    </p>
                </div>

                <div style= {{position:"absolute", right:"350px", }}>
                    {this.state.users.map(user =>
                        <button className="button">
                            <strong>{user.email}</strong>
                            <br/><br/>
                            {this.state.date}
                            <button className="button-secondary" onClick={this.checkIn}>
                                Check In
                            </button>
                        </button>)}
                    
                </div>
            </div>
        )
    }
}