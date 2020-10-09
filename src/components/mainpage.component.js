import React, { Component } from "react";
import   NavigationBar  from './navbar.component.js';

export default class MainPage extends Component {
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