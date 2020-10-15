import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import   NavigationBar  from './navbar.component.js';
//import styles from "src/styles.js"

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{backgroundColor: "#434343"}}>
                <NavigationBar />
            </div>
        )
    }
}