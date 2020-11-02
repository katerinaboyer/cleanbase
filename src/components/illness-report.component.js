import React, { Component } from "react";
import Card from 'react-bootstrap/Card'

export default class IllnessReport extends Component {

    render() {
        return (
        <div style={{marginLeft: "2%", marginTop: "3%", color:"white", position:"relative"}}>
            <h3>Illness Report:</h3> 
            <p>Covid Cases:  27%</p> 
            <Card style={{ width: '20rem', height: '10rem'}}>
               <Card.Title style={{color:"#434343"}}>GRAPH PLACEHOLDER</Card.Title>
            </Card>
            <p>General Illness's: 29%</p>

        </div>
        )
    }
}