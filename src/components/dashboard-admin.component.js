import React, { useState, Component } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";


class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: []
          }
    
    }


    componentDidMount() {
        axios.get('http://localhost:5000/accounts/')
          .then(response => {
              console.log(response.data.length);
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
        return (
        <div>
            {
            this.state.accounts.map(info =>
                <ListGroup style={{paddingBottom:"10px"}}>
                    <ListGroup.Item style={{}}> 
                        <ul style={{listStyle: "none"}}>
                            <li>{info.business_name}</li>
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
                )
            }
        </div>
        )
    }
}

const BuildingAdminDash = (props) => {

    const history = useHistory();

    const addAccount = (e) =>{
        history.push("/account");
    }

    return (
        <div>
            <h2 style={{color:"white", paddingLeft:"3rem"}}> Building Admin Dashboard </h2>
            <Container fluid>
                <Row>
                <Col style={{paddingLeft:"8%"}}>
                    <IllnessReport/>
                </Col>
                <Col style={{paddingRight:"8%"}}>
                    <h3>Accounts:</h3>
                    <Form>
                        <div key={'inline-checkbox'} className="mb-3" style={{color: "white"}}>
                            <Form.Row>
                                <Form.Label style={{paddingRight: "25px", paddingTop:"4px", paddingLeft:"5px"}}>Filter by:</Form.Label>
                                <Form.Check inline label="Floors" type="checkbox" id="floorFilterAdminDash"/>
                                <Form.Check inline label="Companies" type="checkbox" id="companyFilterAdminDash" style={{paddingRight:"100px"}}/>
                            </Form.Row>
                        </div>
                    </Form>
                    <button className="button-secondary" onClick={addAccount}>ADD</button>
                    <Account/>

                </Col>
                </Row>
            </Container>
        </div>
        )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(BuildingAdminDash);


