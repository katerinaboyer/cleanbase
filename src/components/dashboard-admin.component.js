import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";


const BuildingAdminDash = (props) => {

    const [accounts, setAccounts] = useState([]);

    const history = useHistory();

    const addAccount = (e) =>{
        history.push("/account");
    }
    const address = "hi";

    const test= (info) =>{
        console.log(info);

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
        <div>
            <h2 style={{color:"white", paddingLeft:"3rem"}}> Building Admin Dashboard </h2>
            <Container fluid>
                <Row>
                    <Col style={{paddingLeft:"8%"}}>
                        <IllnessReport/>
                    </Col>
                    <Col style={{paddingRight:"8%"}}>
                        <Row style={{paddingLeft:"4%"}}>
                            <h3>Accounts for: {address}</h3>
                            <button className="button-add" style={{marginLeft:"56%"}} onClick={addAccount}>ADD</button>
                        </Row>
                        <div style={{}}>
                            { accounts.map(info =>
                                <div style={{paddingBottom:"10px"}}>
                                    <Card style={{borderRadius:"15px"}}>
                                            <Row>
                                                <Col sm={3}>
                                                    <Card.Title style={{padding:"20px 0px 20px 25px"}}>Floor 1</Card.Title>
                                                </Col>
                                                <Col style={{textAlign: "center"}}>
                                                    <Card.Text style={{color:"#434343", padding:"25px 0px 20px 0%"}}>{info.business_name}</Card.Text>
                                                </Col>
                                                <Col sm={3} style={{}}>
                                                    <button className="button-edit" onClick={() => test(info)}>Edit</button>
                                                </Col>
                                            </Row>
                                    </Card>
                                </div>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(BuildingAdminDash);


