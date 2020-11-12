import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";
import { setAccountId } from "../store/businessAccountReducer";


const SpaceMgmt = (props) => {

  const [accounts, setAccounts] = useState([]);

  const history = useHistory();

  const addAccount = (e) =>{
      history.push("/account");
  }
  const address = "Business Name";

  const test= (info) =>{
    console.log(info);
    history.push("/edit-baccount")

}

const getFloorNumbers = (floors) => {
    const floorNum = [1,2,3];
    const floorText = floorNum[0] + " - " + floorNum[floorNum.length-1];

    return floorText;
}

  useEffect(() => {
      async function fetchData() {
          axios.get('http://localhost:5000/accounts/')
          .then(response => {
              //console.log(response.data.length);
              //console.log(response.data);
              if (response.data.length > 0) {
                  setAccounts(response.data);
              }
          })
          .catch((error) => {
              console.log(error);
          })
      }
      fetchData();
  },[]);

  return (
      <div style={{padding:"30px 8%"}}>
        <Row>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={9}><h3>Desks</h3></Col>
            <Col><button className="button-add" style={{marginLeft:"35%"}} onClick={addAccount}>ADD</button></Col>
          </Row>
          <div style={{}}>
              { accounts.map(info =>
                  <div style={{paddingBottom:"20px"}}>
                      <Card style={{borderRadius:"15px"}}>
                              <Row>
                                  <Col sm={3}>
                                      <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}>Floor 1</Card.Title>
                                  </Col>
                                  <Col style={{textAlign: "center"}}>
                                      <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Desk</Card.Text>
                                  </Col>
                                  <Col sm={3} style={{}}>
                                      <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%"}} onClick={() => test(info)}>Edit</button>
                                  </Col>
                              </Row>
                      </Card>
                  </div>
                  )
              }
          </div>
        </Col>
        <Col sm={1}></Col>
        <Col>
          <Row style={{paddingLeft:"3%"}}>
            <Col sm={9}><h3>Rooms</h3></Col>
            <Col><button className="button-add" style={{marginLeft:"35%"}} onClick={addAccount}>ADD</button></Col>
          </Row>
          <div style={{}}>
              { accounts.map(info =>
                  <div style={{paddingBottom:"20px"}}>
                      <Card style={{borderRadius:"15px"}}>
                              <Row>
                                  <Col sm={3}>
                                      <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}>Floor</Card.Title>
                                  </Col>
                                  <Col style={{textAlign: "center"}}>
                                      <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>Room</Card.Text>
                                  </Col>
                                  <Col sm={3} style={{}}>
                                      <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%"}}onClick={() => test(info)}>Edit</button>
                                  </Col>
                              </Row>
                      </Card>
                  </div>
                  )
              }
          </div>
        </Col>
        </Row>
      </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
setAccountId
})(SpaceMgmt);