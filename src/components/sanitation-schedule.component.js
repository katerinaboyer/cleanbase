import React, {useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect, useSelector } from "react-redux";
import { storeLogout } from "../store/userReducer";
import { getUser } from "../store/selectors";
import "./../styles.css";
import axios from "axios";

 const SanitationSchedule = props => {
  const user = useSelector(getUser);
  
  const [reservation, setReservation] = useState([]);
  const [sanSchedule, setSanSchedule] = useState([]);

  const onAssign = (reservationID) => () => {
    let userArr = [];
    userArr[0] = user._id;
    const te = {attendees: userArr};
    axios.post('http://localhost:5000/reservations/update/attendees/' + reservationID,  te );
  }

  const onComplete = (reservationID) => () => {
    console.log(reservationID);
  }


  useEffect(() => {
    async function fetchData() {
        axios.get("http://localhost:5000/reservations/cleaning/unclaimed")
        .then(response => {
            // console.log(response.data);
            if (response.data.length > 0) {
                setReservation(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    fetchData();
},[]);

useEffect(() => {
  async function fetchData() {
      axios.get("http://localhost:5000/reservations/cleaning/")
      .then(response => {
          console.log(response.data);
          console.log(user);
          if (response.data.length > 0) {
            setSanSchedule(response.data);
          }
      })
      .catch((error) => {
          console.log(error);
      })
  }
  fetchData();
},[]);

  // render() {
    return (
      <div>
        <div
          style={{
            width: "32%",
            float: "right",
            marginRight: "3%",
            marginTop: "20%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>
            Upcoming Schedule
          </h5>
          {reservation.map(reserv => {
            return (
            <Card className="san-sched">
              <Card.Body className="card-body">
            <ul style={{listStyleType: "none"}}><li>{reserv.title}</li><li>{reserv.start_time} - {reserv.end_time}</li><li>Room: {reserv.room_number} Desk: {reserv.desk_number}</li></ul>
              <Button size="sm" variant="light" style={{marginLeft: "42%"}} onClick={onAssign(reserv._id)}>
                Assign
              </Button>
            </Card.Body>
          </Card> )
          })}
        </div>
        <div
          style={{
            width: "32%",
            float: "left",
            marginLeft: "3%",
            marginTop: "20%",
            marginBottom: "2%"
          }}
        >
          <h5 style={{ color: "white", textAlign: "center" }}>My Schedule</h5>
          {sanSchedule.filter(san => san.attendees[0] == user._id).map(reserv => {
            return (
            <Card className="san-sched">
              <Card.Body className="card-body">
            <ul style={{listStyleType: "none"}}><li>{reserv.title}</li><li>{reserv.start_time} - {reserv.end_time}</li><li>Room: {reserv.room_number} Desk: {reserv.desk_number}</li></ul>
              <Button size="sm" variant="light" style={{marginLeft: "42%"}} onClick={onComplete(reserv._id)}>
                complete
              </Button>
            </Card.Body>
          </Card> )
          })}
        </div>
      </div>
    );
 // }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  storeLogout
})(SanitationSchedule);

