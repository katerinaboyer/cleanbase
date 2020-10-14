import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import   NavigationBar  from './navbar.component.js';

export default class BuildingAdminDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            building_admin: '',
            num_floors: '',
            capacity: '',
            address: '',
            users: []
          }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                      users: response.data.map(user => user._id),
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
            <div>
                <ul>
                    {this.state.users.map(user => 
                        <li key={user.email}>
                            {user._id}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}