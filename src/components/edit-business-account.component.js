import React, {useState, useEffect } from "react";
import { Row, Col, Form} from 'react-bootstrap';
import ToastMessage from './toast.component';
//import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
//import {format} from "date-fns";
//import { getUser } from "../store/selectors";
import { getBusinessAccount, getUser } from "../store/selectors";
import axios from "axios";

const EditBusinessAccount = (props) => {
    const businessAccount = useSelector(getBusinessAccount);

    const [oManager, setManagers] = useState([]);
    const [name, setName] = useState(businessAccount.business_name);
    const [floor, setFloor] = useState('');
    const [floorInit, setFloorInit] = useState([]);
    const [manager, setManager] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    //const [disable, setDisabled] = useState();

    //const history = useHistory();
    const user = useSelector(getUser);
    //const businessAccount = useSelector(getBusinessAccount);

    useEffect(() => {
        const filterManagers = (user) => {
          if (
            user.role === "office_manager"
          ){
            return true;
          } else {
            return false;
          }
        }

        async function fetchData() {
            axios.get('http://localhost:5000/users/all')
            .then(response => {
                //console.log(response.data.length);
                //console.log(response.data);
                if (response.data.length > 0) {
                    setManagers(response.data.filter(filterManagers));
                }
            })
            .catch((error) => {
                console.log(error);
            });

            const floorsAssigned = await axios.get('http://localhost:5000/floors/');
            setFloorInit(floorsAssigned.data);
        }
        fetchData();
    },[]);

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const floorChange = (e) => {
        setFloor(e.target.value);
    }

    const managerChange = (e) => {
        setManager(e.target.value);
    }

    const update = (e) => {
      const updateAccount = {
        business_name: name,
        floors_assigned: floor,
        office_manager: manager,
      }

      console.log(updateAccount);

      axios.post('http://localhost:5000/accounts/update/' + businessAccount._id, updateAccount)
      .then(res => console.log(res.data));

      setShowSuccess(true);
      setTimeout(() => {setShowSuccess(false)}, 5000);
    }

    const remove = (e) => {

    }

    const floors = [1,2,3,4];

    return(
        <div>
            <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
                <h3 className="h3">Business Account Info:</h3>
                <Form>
                    <Form.Group as={Row} controlId="formBasicName">
                        <Form.Label column sm={3}>Business Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="name" placeholder={businessAccount.business_name} onChange={nameChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>Floors</Form.Label>
                        <Col sm={9}>
                            <Form.Control as="select" multiple onChange={floorChange}>
                              {floorInit.map((floor) => {
                              return (
                                  <option key={floor.floor_number} value={floor.floor_number}>
                                    {floor.floor_number}
                                  </option>
                                  );
                              })}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Form.Label column sm={3}>Office Manager</Form.Label>
                        <Col sm={9}>
                            <Form.Control as="select" multiple onChange={managerChange}>
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
                </Form>
                <Row>
                    <button className="button-submit" type="submit" onClick={update}>
                        Update
                    </button>
                    <button className="button-remove" type="submit" onClick={remove}>
                        Remove
                    </button>
                </Row>
            </div>
            <ToastMessage show={showSuccess} text={`This account has been updated.`} />
        </div>
    )

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(EditBusinessAccount);
