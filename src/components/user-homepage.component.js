import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';
import { UserContext } from '../App';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UserContext.Consumer>
              {({user, isAuth, setUser}) => (
                <div>
                  This is the user homepage.
                </div>
              )}
            </UserContext.Consumer>
        )
    }
}
