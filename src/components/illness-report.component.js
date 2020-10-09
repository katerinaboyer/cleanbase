import React, { Component } from "react";
import Card from 'react-bootstrap/Card'

export default class IllnessReport extends Component {

    render() {
        return (
        <div>
            <h2>Illness Report:</h2> 
            <p>Covid Cases:  27%</p> 
            <Card style={{ width: '20rem', height: '10rem' }}>
               <Card.Title>GRAPH PLACEHOLDER</Card.Title>
            </Card>
            <p>General Illness's: 29%</p>

        </div>
        )
    }
}