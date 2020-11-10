import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card'


export default class IllnessReport extends Component {

    constructor(props) {
        super(props);
    
       
        // should initialize attendees[0] with the current signed in user
        this.state = {
          count: "5"
        };
      }

    componentDidMount() {
        axios
          .all([
            axios.get("http://localhost:5000/selfIllnessReport/count"),
          ])
          .then(([countResponse]) => {
            this.setState({
              
              count: countResponse.data[0],
              
            });
          });
      }

    render() {
        return (
        <div style={{marginLeft: "2%", marginTop: "3%", color:"white", position:"relative"}}>
            <h3>Illness Report:</h3> 
            <p>Reported Illnesses: 5 </p> 
            <Card style={{ width: '20rem', height: '10rem'}}>
               <Card.Title style={{color:"#434343"}}>{5}</Card.Title>
            </Card>

        </div>
        )
    }
}