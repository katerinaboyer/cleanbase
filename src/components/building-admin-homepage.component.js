import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import   NavigationBar  from './navbar.component.js';

export default class BuildingAdminDash extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar />
            </div>
        )
    }
}