import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css'
import { Row, Col, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { setAccountId } from "../store/businessAccountReducer";
import { getUser } from "../store/selectors";


const AccountMgmt = (props) => {

  const [accounts, setAccounts] = useState([]);
  const user = useSelector(getUser);

  const history = useHistory();

  const addAccount = (e) =>{
      history.push("/addemployee");
  }
  const address = "Business Name";

  const removeEmployee = (info) =>{
      const update = {
          business_account_id: ""
      }
    axios.get('http://localhost:5000/users/removeComp/' + info._id,update)
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
    // axios.get('http://localhost:5000/account/removeEmployee/' + info._id)
    //     .then(response => {
    //         //console.log(response.data.length);
    //         //console.log(response.data);
    //         if (response.data.length > 0) {
    //             setAccounts(response.data);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })   
    }

  useEffect(() => {
      async function fetchData() {
          console.log(user);
          axios.get('http://localhost:5000/user/businessAcct/' + user.business_account_id)
          .then(response => {
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
      <div style={{padding:"30px 10%"}}>
        <Row style={{paddingLeft:"3%"}}>
          <Col sm={9}><h3>{address} Employees</h3></Col>
          <Col><button className="button-add" style={{marginLeft:"55%"}} onClick={addAccount}>ADD</button></Col>
        </Row>
        <div style={{}}>
            { accounts.map(info =>
                <div style={{paddingBottom:"20px"}}>
                    <Card style={{borderRadius:"15px"}}>
                            <Row>
                                <Col sm={3}>
                                    <Card.Title style={{padding:"20px 0px 20px 25px", fontSize:"130%"}}>{info.name}</Card.Title>
                                </Col>
                                <Col style={{textAlign: "center"}}>
                                    <Card.Text style={{color:"#434343", padding:"25px 0px 40px 0%", fontSize:"130%"}}>{info.email}</Card.Text>
                                </Col>
                                <Col sm={3} style={{}}>
                                    <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%"}}onClick={() => removeEmployee(info)}>Remove</button>
                                </Col>
                            </Row>
                    </Card>
                </div>
                )
            }
        </div>
      </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
setAccountId
})(AccountMgmt);