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
  const [address, setAddress] = useState();
  const user = useSelector(getUser);
  const [val, setVal] = useState(true);
  //console.log(user);

  const history = useHistory();

  const addAccount = (e) =>{
      history.push("/addemployee");
  }


  const removeEmployee = (info) =>{
      const update = {
          business_account_id: null
      }
        axios.post('http://localhost:5000/users/update/' + info._id,update)
        .then(response => { 
            console.log(response);
            setVal(!val)
        })
        .catch((error) => {
            console.log(error);
        })   
    }

  useEffect(() => {
      async function fetchData() {
          //console.log(user);
          axios.get('http://localhost:5000/users/businessAcct/' + user.business_account_id)
          .then(response => {
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
  },[val]);

  const role = (info) =>{
    if(info === "employee"){
        return "Employee"
    } else if(info === "office_manager"){
        return "Office Manager"
    } else if(info === "sanitation"){
        return "Sanitation"
    }
  }

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
                                    <Card.Title style={{padding:"30px 0px 10px 25px", fontSize:"130%"}}>{info.name}<br/><p style={{color:"#434343", fontSize:"80%", paddingTop:"5px"}}>{role(info.role)}</p></Card.Title>
                                </Col>
                                <Col style={{textAlign: "center"}}>
                                    <Card.Text style={{color:"#434343", padding:"35px 0px 40px 0%", fontSize:"130%"}}>{info.email}</Card.Text>
                                </Col>
                                <Col sm={3} style={{}}>
                                    <button className="button-edit" style={{marginLeft:"50%", fontSize:"130%", marginTop:"35px"}}onClick={() => removeEmployee(info)}>Remove</button>
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