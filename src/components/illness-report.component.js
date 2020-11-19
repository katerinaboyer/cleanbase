import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';




export default class IllnessReport extends Component {

    constructor(props) {
        super(props);
    
       
        // should initialize attendees[0] with the current signed in user
        this.state = {
          count: "5",
          selfIllnessDates: [],
          arrow: "",
          todayCount: 0,
          yesterdayCount: 0
        };
      }

    componentDidMount() { //8.64e7
      this.setState({
        yesterdayCount: 0,
      });
        axios
          .all([
            axios.get("http://localhost:5000/selfIllnessReport/count"),
          ])
          .then(([countResponse]) => {
            
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
            var interDate = this.state.selfIllnessDates.concat(selfIllnessTest.data[i].createdAt);
            var date = new Date(selfIllnessTest.data[i].createdAt);
            var dateAdjusted = new Date(Date.now() - 8.64e7);
            
            
            if(date.getDate() <= dateAdjusted.getDate()){
              this.setState({
              
                yesterdayCount: this.state.yesterdayCount + 1,
                
              });
              


            }
            
            this.setState({
              
              selfIllnessDates: interDate,
              
            });
            
          }
          console.log(this.state.count);
          console.log(this.state.yesterdayCount);
            if(this.state.count === this.state.yesterdayCount){
              this.setState({
              
                arrow: "-",
                
              });
            }
            if(this.state.count >= this.state.yesterdayCount){
              this.setState({
              
                arrow: "↑",
                
              });
            }
            if(this.state.count <= this.state.yesterdayCount){
              this.setState({
              
                arrow: "↓",
                
              });
            }
          });

      }

    render() {
      
        return (
        <div style={{marginLeft: "2%", marginTop: "3%", color:"white", position:"relative"}}>
            <h3>Illness Report:</h3> 
            <p>Reported Illnesses: {this.state.count}</p> 
            <Card style={{ width: '13rem', height: '10rem', backgroundColor: "transparent", border:"none"}}>
               <Card.Title style={{color:"#ffffff",fontSize:128,textAlign:"center"}}>{this.state.count}{this.state.arrow}</Card.Title>
            </Card>

        </div>
        )
    }
}