import React, {useState, useEffect} from "react";
import axios from "axios";
import {Form, Col, Row} from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import './../styles.css';

const AccountSettings = (props) => {

    const [user, setUsers] = useState([]);

    const history = useHistory();

    const onNameChange = (e) => {
        user.name = e.target.value;
    }

    const onSubmit = () => {

    }

    const onChangeAttendees = (e) => {

    }

    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/users/onlyemployees')
          .then(response => {
              console.log(response.data);
              if (response.data.length > 0) {
                  setUsers(response.data);
              }
          })
          .catch((error) => {
              console.log(error);
          })
        }
        fetchData();
    },[]);
    

    return(
        <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
        <h3 className="h3">Add Employee to </h3>
        <Form onSubmit={onSubmit}>
        <Form.Group as={Row} controlId="formBasicAttendees">
            <Form.Label column sm={3}>Employees</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                multiple
                onChange={onChangeAttendees}
              >
                {user.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>

            <button className="button-submit" type="submit">
                Add Employee
            </button>
        </Form>
      </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(AccountSettings);