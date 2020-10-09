import React, { Component } from "react";
import   NavigationBar  from './navbar.component.js';
import IllnessReport from './illness-report.component';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>this is the homepage</p>
                <IllnessReport />
            </div>
        )
    }
}