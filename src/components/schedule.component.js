import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentSchedule from "./current-schedule.component";
import Card from "react-bootstrap/Card";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setReservation } from "../store/reservationReducer";
import "./../styles.css";

const Schedule = (props) => {
  const [desks, setDesks] = useState([]);
  const [officeRooms, setOfficeRooms] = useState([]);
  const [conferenceRooms, setConferenceRooms] = useState([]);
  const [reservationsArr, setReservationsArr] = useState([]);

  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("17:00");
  const [isOffice, toggleIsOffice] = useState(false);
  const [isConference, toggleIsConference] = useState(false);
  const [isDesk, toggleIsDesk] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      axios
        .all([
          axios.get("http://localhost:5000/rooms/room_type/office"),
          axios.get("http://localhost:5000/rooms/room_type/conference"),
          axios.get("http://localhost:5000/desks"),
        ])
        .then(([officeResponse, conferenceResponse, deskResponse]) => {
          if (officeResponse.data.length > 0) {
            setOfficeRooms(officeResponse.data);
          }
          if (conferenceResponse.data.length > 0) {
            setConferenceRooms(conferenceResponse.data);
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
  }, [isDesk, isOffice, isConference]);

  const handleDeskClick = (desk) => {
    console.log(desk)
    const newReservation = {
      start_time: start,
      end_time: end,
      date: date,
      desk_id: desk._id,
      desk_number: desk.desk_number,
      room_number: desk.room_number,
      room_id: desk.room_id
    }
    props.setReservation(newReservation);
    history.push("/reservation");
  };

  const handleRoomClick = (room) => {
    console.log(room)
    const newReservation = {
      start_time: start,
      end_time: end,
      date: date,
      room_id: room._id,
      room_number: room.room_number,
      room_type: room.room_type,
      desk_number: 1
    }
    props.setReservation(newReservation);
    history.push("/reservation");
  }

  const onChangeDate = (date) => {
    setDate(date);
    const dateVar = date;
    console.log("http://localhost:5000/reservations/date/" + dateVar);
    axios.get("http://localhost:5000/reservations/date/" + dateVar)
      .then((res) => {
        console.log(res.data);
        setReservationsArr(res.data)
      })
  }

  

  return (
    <div>
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: "60px" }} s={12}>
            <h4>Filters</h4>
            <Form>
              <Form.Group as={Row} controlId="formDate">
                <Form.Label column sm={3} style={{ color: "white" }}>
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Day of Reservation"
                  data-date-format="MM-DD-YYYY"
                  onChange={ e => onChangeDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Row} controlId="time">
                <Form.Label column sm={3} style={{ color: "white" }}>
                  Start
                </Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Start"
                  onChange={(e) => setStart(e.target.value)}
                />
                <Form.Label column sm={3} style={{ color: "white" }}>
                  End
                </Form.Label>
                <Form.Control
                  type="time"
                  placeholder="End"
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="roomType" style={{ color: "white" }}>
                <Form.Check
                  type="checkbox"
                  label="Desk"
                  onChange={(e) => toggleIsDesk(!isDesk)}
                />
                <Form.Check
                  type="checkbox"
                  label="Office"
                  onChange={(e) => toggleIsOffice(!isOffice)}
                />
                <Form.Check
                  type="checkbox"
                  label="Conference"
                  onChange={(e) => toggleIsConference(!isConference)}
                />
              </Form.Group>
            </Form>
          </Col>

          <Col s={12}>
            <h4>Available</h4>
            {!isDesk && !isOffice && !isConference && (
              <Container>
                {desks.map((desk, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Desk {desk.desk_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>Room {desk.room_number}</Col>
                          <Col>Capacity 1</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleDeskClick(desk);
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
                {officeRooms.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Room {room.room_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>{room.room_type}</Col>
                          <Col>Capacity {room.capacity}</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleRoomClick(room);
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
                {conferenceRooms.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Room {room.room_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>{room.room_type}</Col>
                          <Col>Capacity {room.capacity}</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleRoomClick(room);
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
              </Container>
            )}
            {isDesk && (
              <Container>
                {desks.map((desk, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Desk {desk.desk_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>Room {desk.room_number}</Col>
                          <Col>Capacity 1</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleDeskClick(desk);
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
              </Container>
            )}
            {isOffice && (
              <Container>
                {officeRooms.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Room {room.room_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>{room.room_type}</Col>
                          <Col>Capacity {room.capacity}</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleRoomClick(room);
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
              </Container>
            )}
            {isConference && (
              <Container>
                {conferenceRooms.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Card style={{ width: "23rem", padding: ".5rem" }}>
                      <Card.Title>Room {room.room_number}</Card.Title>
                      <Container>
                        <Row>
                          <Col>{room.room_type}</Col>
                          <Col>Capacity {room.capacity}</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                handleRoomClick(room);
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
              </Container>
            )}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setReservation,
})(Schedule);
