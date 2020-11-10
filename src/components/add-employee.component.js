import React, { Component } from "react";
import axios from "axios";
import './../styles.css';

export default class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: []
          }
    
    }
    componentDidMount() {
        axios.get('http://localhost:5000/accounts/')
          .then(response => {
              console.log(response.data);
              if (response.data.length > 0) {
                  this.setState({
                      accounts: response.data.map(account => account)
                  })
              }
          })
          .catch((error) => {
              console.log(error);
          })

    }


    render() {
        return(
            <p>this is the add employee</p>
        );
    }
}