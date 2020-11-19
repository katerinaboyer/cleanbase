import React, {useState, useEffect} from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import { Row, Col, Form} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { getUser } from "../store/selectors";
import { storeLogin } from '../store/userReducer';
import "./../styles.css"


const AccountSettings = (props) => {

    const [companyInfo, setCompanyInfo] = useState();
    const [value, setValue] = useState(0)

    const history = useHistory();
    const user = useSelector(getUser);

    const onNameChange = (e) => {
        user.name = e.target.value;
    }

    const onEmailChange = (e) => {
        user.email = e.target.value;
    }

    const onPhoneChange = (e) => {
        user.phone = e.target.value;
    }

    useEffect(()=> {
        axios.get("http://localhost:5000/accounts/id/" + user.business_account_id)
        .then((response) => {
            setCompanyInfo(response.data[0])
            console.log(response.data[0])
        })
    },[value]);

    const onUpdateUser = (e) => {
        
        const updateUser = {
            email: user.email,
            name: user.name,
            phone: user.phone,
        };
        
        axios.post('http://localhost:5000/users/update/' + user._id, updateUser)
        .then(res => console.log(res.data));

        const newUser = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            _id: user._id,
        }
        console.log(newUser);

        //props.storeLogin(newUser);
        //history.push("/account-settings")
        setValue(updateUser.length)
        
    }

    const properRole = (role) => {
        if(role === "employee"){
            return "Employee"
        } else if (role === "office_manger"){
            return "Office Manager"
        } else if (role === "building_admin"){
            return "Building Admin"
        } else if (role === "sanitation"){
            return "Sanitation"
        } else {
            return role
        }
    }
    

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

                    {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>Address</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="address" placeholder="Company Address" readOnly/>
                        </Col>
                    </Form.Group> */}

                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Form.Label column sm={3}>Role</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="role" placeholder={properRole(user.role)} readOnly/>
                        </Col>
                    </Form.Group>
                </Form>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
    storeLogin
})(AccountSettings);
