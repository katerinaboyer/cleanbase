import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          This is the user homepage.
        </div>
      )
    }
}
