import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentSchedule from "./current-schedule.component";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setReservation } from "../store/reservationReducer";
import "./../styles.css";

const Schedule = (props) => {
  const [desks, setDesks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("17:00");
  const [isOffice, toggleIsOffice] = useState(false);
  const [isConference, toggleIsConference] = useState(false);
  const [isDesk, toggleIsDesk] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isDesk) {
      console.log("hELLO")
    }
    async function fetchData() {
      axios
        .all([
          axios.get("http://localhost:5000/rooms"),
          axios.get("http://localhost:5000/desks"),
        ])
        .then(([roomResponse, deskResponse]) => {
          if (roomResponse.data.length > 0) {
            setRooms(roomResponse.data);
          }
          if (deskResponse.data.length > 0) {
            setDesks(deskResponse.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [rooms, desks, isOffice, isConference, isDesk]);

  

  // filter button run use effect function again. re render

  const handleClick = (desk) => {
    props.setReservation(desk);
    history.push("/reservation");
  };

  function handleDayClick(date) {
    var dateStr = String(date);
    var formattedDate = dateStr.slice(0, 15);
    console.log(formattedDate);
    setDate(formattedDate);
  }

  function onChangeStart(startTime) {
    console.log(startTime);
    setStart(startTime);
  }

  function onChangeEnd(endTime) {
    console.log(endTime);
    setEnd(endTime);
  }

  const today = new Date();

  return (
    <Container fluid>
      <Row>
        <Col style={{ paddingLeft: "75px" }}>
          <div
            style={{
              padding: "0px",
            }}
          >
            <div style={{ paddingBottom: "10px", backgroundColor: "white" }}>
              <div>
                <center>
                  <DayPicker
                    month={today}
                    fromMonth={today}
                    disabledDays={{ daysOfWeek: [0, 6] }}
                    onDayClick={handleDayClick}
                    format="MM/dd/yyyy"
                    style={{ backgroundColor: "White" }}
                  />
                </center>
              </div>
            </div>

            <div style={{ backgroundColor: "white", padding: "20px" }}>
              <TimePicker onChange={onChangeStart} />
              <TimePicker onChange={onChangeEnd} />
            </div>

            <div
              class="custom-control custom-checkbox"
              style={{ color: "white" }}
            >
              <input type="checkbox" class="custom-control-input" id="desk" onClick={e => {toggleIsDesk(!isDesk)}}/>
              <label class="custom-control-label" for="desk">
                Desk
              </label>
            </div>
            <div
              class="custom-control custom-checkbox"
              style={{ color: "white" }}
            >
              <input type="checkbox" class="custom-control-input" id="office" onClick={e => {toggleIsOffice(!isOffice)}}/>
              <label class="custom-control-label" for="office">
                Office
              </label>
            </div>
            <div
              class="custom-control custom-checkbox"
              style={{ color: "white" }}
            >
              <input
                type="checkbox"
                class="custom-control-input"
                id="conference"
                onClick={e => {toggleIsConference(!isConference)}}
              />
              <label class="custom-control-label" for="conference">
                Conference Room
              </label>
            </div>

            <div style={{ paddingTop: "15px", alignSelf: "left" }}>
              <button className="button-submit" type="submit">
                Filter
              </button>
            </div>
          </div>
        </Col>
        <Col s={12}>
          <Container style={{ padding: "1rem" }}>
            {desks.map((desk, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "1rem",
                }}
              >
                <Card style={{ width: "19rem", padding: ".5rem" }}>
                  <Card.Title>Desk: {desk.desk_number}</Card.Title>
                  <Container>
                    <Row>
                      <Col>Floor #</Col>
                      <Col>Room #</Col>
                      <Col>
                        <Button
                          onClick={() => {
                            handleClick(desk);
                          }}
                          size="sm"
                          style={{ float: "right" }}
                        >
                          ADD
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </div>
            ))}

            {rooms.map((room, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "1rem",
                }}
              >
                <Card style={{ width: "19rem", padding: ".5rem" }}>
                  <Card.Title>Room: {room.room_number}</Card.Title>
                  <Container>
                    <Row>
                      <Col>{room.room_type}</Col>
                      <Col>Floor #</Col>
                      <Col>
                        <Link to="/confirm" style={{ float: "right" }}>
                          ADD
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </div>
            ))}
          </Container>
        </Col>
        {/* <Col xs={5} style={{ paddingTop: "75px" }}> */}
        {/* <Card
            style={{
              borderRadius: "1rem",
              width: "90%",
              float: "right",
              marginRight: "10%",
              marginBottom: "1%"
            }}
          >
            <Card.Body>
              This is some text within a card body.
              <Link to="/confirm" style={{ float: "right" }}>
                ADD
              </Link>
            </Card.Body>
          </Card> */}
        {/* </Col> */}
        <Col style={{ paddingRight: "50px" }}>
          <CurrentSchedule />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setReservation,
})(Schedule);
