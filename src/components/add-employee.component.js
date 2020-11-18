import React, {useState, useEffect} from "react";
import axios from "axios";
import {Form, Col, Row} from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import './../styles.css';

const AddEmployee = (props) => {

    const [user, setUsers] = useState([]);
    const [id, setID] = useState();

    const history = useHistory();

    const onSubmit = () => {
      const update = {
        business_account_id: "test",
      }
      axios.post("http://localhost:5000/users/addbusiness/" + id, update)
      .then(res => console.log(res.data));
      history.push("/account-mgmt");
    }

    const onChangeBusinessId = (e) => {
      let value = e.target.value;
      setID(value);
    }

    const filter = () => {
        let temp = user;
        console.log(user);
        for(var i = 0; i < temp.size; i++) {
            //if(temp[i].business_account_id.length < 1){
                //temp.splice(i,1);
            //}
            console.log(temp[i].business_account_id.length)
        }
        setUsers(temp);
        //console.log(user);
        //console.log(temp);
    }

    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/users/onlyemployees')
          .then(response => {
              console.log(response.data);
              if (response.data.length > 0) {
                  setUsers(response.data);
                  //filter();
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
        <Form>
        <Form.Group as={Row} controlId="formBasicAttendees">
            <Form.Label column sm={3}>Employees</Form.Label>
            <Col sm={9}>
              <Form.Control as="select" onChange={onChangeBusinessId}>
                {user.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>{user.name} + {user.business_account_id}</option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <button className="button-submit" onClick={onSubmit}>
          Add Employee
        </button>
      </div>
    )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(AddEmployee);