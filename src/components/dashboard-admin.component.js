import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { setAccountId } from "../store/businessAccountReducer";
import { getUser } from "../store/selectors";


const BuildingAdminDash = (props) => {

    const [accounts, setAccounts] = useState([]);
    const [address, setAddress] = useState();
    const [bot, setBot] = useState();
    const [top, setTop] = useState();

    const user = useSelector(getUser)

    const history = useHistory();

    const addAccount = (e) =>{
        history.push("/account");
    }

    const test= (info) =>{
        props.setAccountId(info);
        history.push("/edit-baccount")
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
            axios.get('http://localhost:5000/buildings/mybuilding/' + user._id)
            .then(response => {
                if (response.data.length > 0) {
                    setAddress(response.data[0].address);
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
                            <h3>{address}</h3>
                            <button className="button-add" style={{marginLeft:"56%"}} onClick={addAccount}>ADD</button>
                        </Row>
                        <div style={{}}>
                            { accounts.map(info =>
                                <div style={{paddingBottom:"10px"}}>
                                    <Card style={{borderRadius:"15px"}}>
                                            <Row>
                                                <Col sm={4}>
                                                    <Card.Title style={{padding:"20px 0px 20px 25px"}}>Floors {info.floor_numbers}</Card.Title>
                                                </Col>
                                                <Col style={{textAlign: "center"}}>
                                                    <Card.Text style={{color:"#434343", padding:"25px 0px 20px 0%"}}>{info.business_name}</Card.Text>
                                                </Col>
                                                <Col sm={4} style={{}}>
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

export default connect(mapStateToProps, {
  setAccountId
})(BuildingAdminDash);
