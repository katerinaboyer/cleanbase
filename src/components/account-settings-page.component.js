import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import { Row, Col, Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { getUser } from "../store/selectors";
import "./../styles.css"


const AccountSettings = (props) => {

    const [companyInfo, setCompanyInfo] = useState([]);

    const history = useHistory();
    const user = useSelector(getUser);

    const address = "hi";
    console.log(user._id)
    const onNameChange = (e) => {
        user.name = e.target.value;
    }

    const onEmailChange = (e) => {
        user.email = e.target.value;
    }

    const onPhoneChange = (e) => {
        user.phone = e.target.value;
    }

    const onUpdateUser = (e) => {
        
        const updateUser = {
            email: user.email,
            name: user.name,
            phone: user.phone,
        };
        
        axios.post('http://localhost:5000/users/update/' + user._id, updateUser)
        .then(res => console.log(res.data));
        
    }
    /*
    useEffect(() => {
        async function fetchData() {
            
        }
        fetchData();
    },[]);
    */
    

    return(
        <div>
            <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
                <h3 className="h3">Personal Info:</h3>
                <Form>
                    <Form.Group as={Row} controlId="formBasicName">
                        <Form.Label column sm={3}>Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="name" placeholder={user.name} onChange={onNameChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>Email</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" placeholder={user.email} onChange={onEmailChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Form.Label column sm={3}>Phone</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="phone" placeholder={user.phone} onChange={onPhoneChange}/>
                        </Col>
                    </Form.Group>
                </Form>
                <button className="button-submit" onClick={onUpdateUser}>
                    Update
                </button>
            </div> 

            <div style={{marginLeft:"10.5rem", paddingTop:"150px", display:"block", color:"white", width:"45%"}} >
                <h3 className="h3">Company Info:</h3>
                <Form>
                    <Form.Group as={Row} controlId="formBasicName">
                        <Form.Label column sm={3}>Company Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="name" placeholder="Company Name" readOnly/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>Address</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="address" placeholder="Company Address" readOnly/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Form.Label column sm={3}>Role</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="role" placeholder="employee" readOnly/>
                        </Col>
                    </Form.Group>
                </Form>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(AccountSettings);
