import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';




export default class IllnessReport extends Component {

    constructor(props) {
        super(props);
    
       
        // should initialize attendees[0] with the current signed in user
        this.state = {
          count: "5",
          selfIllnessDates: []
        };
      }

    componentDidMount() {
        axios
          .all([
            axios.get("http://localhost:5000/selfIllnessReport/count"),
          ])
          .then(([countResponse]) => {
            console.log(countResponse.data);
            this.setState({
              
              count: countResponse.data,
              
            });
          });

          axios
          .all([
            axios.get("http://localhost:5000/selfIllnessReport/"),
          ])
          .then(([selfIllnessTest]) => {
            
            for(var i = 0; i < selfIllnessTest.data.length; i++){
            var interDate = this.state.selfIllnessDates.concat(selfIllnessTest.data[i].date)
            
            this.setState({
              
              selfIllnessDates: interDate,
              
            });
            console.log(this.state.selfIllnessDates);
          }
            
          });

      }

    render() {
        return (
        <div style={{marginLeft: "2%", marginTop: "3%", color:"white", position:"relative"}}>
            <h3>Illness Report:</h3> 
            <p>Reported Illnesses: {this.state.count} </p> 
            <Card style={{ width: '20rem', height: '10rem'}}>
               <Card.Title style={{color:"#434343",fontSize:128}}>{this.state.count}</Card.Title>
            </Card>

        </div>
        )
    }
}