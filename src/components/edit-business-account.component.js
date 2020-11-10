import React, {useState, useEffect } from "react";
import {ListGroup} from 'react-bootstrap';
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {format} from "date-fns";
import { getUser } from "../store/selectors";
import axios from "axios";

const EditBusinessAccount = (props) => {

    const [oManager, setManagers] = useState([]);

    const history = useHistory();
    const user = useSelector(getUser);

    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/users/all')
            .then(response => {
                //console.log(response.data.length);
                console.log(response.data);
                if (response.data.length > 0) {
                    setManagers(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchData();
    },[]);

    const update = (e) => {

    }

    const remove = (e) => {

    }

    return(
        <div>
            <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
                <h3 className="h3">Business Account Info:</h3>
                <Form>
                    <Form.Group as={Row} controlId="formBasicName">
                        <Form.Label column sm={3}>Business Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="name" placeholder="Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>Floors</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Form.Label column sm={3}>Office Manager</Form.Label>
                        <Col sm={9}>
                            <Form.Control as="select" multiple>
                                {oManager.map((user) => {
                                return (
                                    <option key={user._id} value={user._id}>
                                    {user.name}
                                    </option>
                                    );
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Row>
                        <button className="button-submit" type="submit" onClick={update}>
                            Update
                        </button>
                        <button className="button-remove" type="submit" onclick={remove}>
                            Remove
                        </button>
                    </Row>
                </Form>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(EditBusinessAccount);