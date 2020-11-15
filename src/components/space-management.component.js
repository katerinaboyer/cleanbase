import React, {useState, useEffect } from "react";
import axios from "axios";
//import { Link } from 'react-router';
import './../styles.css';
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { setAccountId } from "../store/businessAccountReducer";
import { getUser } from "../store/selectors";


const SpaceMgmt = (props) => {

  const [accounts, setAccounts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [desks, setDesks] = useState([]);
  //setAccounts([]);


  const history = useHistory();
  const user = useSelector(getUser);

  const addAccount = (e) =>{
      history.push("/account");
  }
  const address = "Business Name";

  const test= (info) =>{
    console.log(info);
    history.push("/edit-baccount")

}

const getFloorNumbers = (floors) => {
    const floorNum = [1,2,3];
    const floorText = floorNum[0] + " - " + floorNum[floorNum.length-1];

    return floorText;
}

  useEffect(() => {
      async function fetchData() {
          axios.get('http://localhost:5000/accounts/officemanager/' + user._id)
          .then(response => {
              console.log(response.data[0].floors_assigned);
              for(var i = 0; i < response.data[0].floors_assigned.length; i++){
                axios.get('http://localhost:5000/floors/id/' + response.data[0].floors_assigned[i])
                .then(response => {
                    console.log(response.data);
                    for(var i = 0; i < response.data.room_list.length; i++){
                        axios.get('http://localhost:5000/rooms/id/' + response.data.room_list[i])
                        .then(response => {
                            setRooms(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        axios.get('http://localhost:5000/desks/byrooom/' + response.data.room_list[i])
                        .then(response => {
                            setDesks(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
              }
          })
          .catch((error) => {
              console.log(error);
          })

      }
      fetchData();
  },[]);

  return (
      <div style={{padding:"30px 8%"}}>
        
      </div>
      )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps, {
setAccountId
})(SpaceMgmt);