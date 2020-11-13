import React, {useState, useEffect} from "react";
import { Row, Col, Card} from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {format} from "date-fns";
import { getUser } from "../store/selectors";
import axios from "axios";



const CurrentSchedule = (props) => {

    const [schedule, setSchedule] = useState([]);

    const history = useHistory();
    const user = useSelector(getUser);
    const location = useLocation();

    const newReservation = (e) =>{
        history.push("/reservation");
    }
    const currDate = format(new Date(), 'MM/dd');
    //const [value, setValue] = useState(0);


    const checkIn = (info) => {
        console.log(info);
        const updateCheckIn = {
            checkedIn: true,
        }
        axios.post('http://localhost:5000/reservations/checkin/' + info._id, updateCheckIn)
            .then(response => {
                console.log(response.data);
                if (response.data.length > 0) {
                    setSchedule(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const formatDate = (date) =>{
        return  date.substring(5,7) + '/' + date.substring(8,10);
    }

    const formatTime = (time) => {

        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours === 0) {
        timeValue= "12";
        }
        
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

        return timeValue;
    }

    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/reservations/current/' + user._id)
            .then(response => {
                console.log(response.data);
                if (response.data.length > 0) {
                    setSchedule(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchData();
    },[]);

    return(
        <div style={{paddingTop:"0px"}}>
            <Col style={{paddingRight:"8%"}}>
                <Row>
                    <Col sm={7} >
                        <h4 style={{paddingLeft:"20px", paddingRight:"0px"}}>Upcoming Schedule</h4>
                    </Col>
                    <Col >
                        {location.pathname !== "/schedule" && <button className="button-createreservation" onClick={newReservation}>Create Reservation</button> }
                    </Col>
                </Row>
                <div style={{}}>
                    { schedule.map(info =>
                        <div>
                            { formatDate(info.date) >= currDate && 
                            <Card style={{borderRadius:"15px", marginBottom: "10px"}}>
                                    <Row>
                                        {info.title.length > 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date) + " - " + info.title}</h5>}
                                        {info.title.length === 0 && <h5 style={{padding:"10px 0px 0px 30px"}}>{formatDate(info.date)}</h5>}
                                    </Row>
                                    <Row>
                                        <Card.Text style={{color:"#434343", padding:"0px 0px 5px 100px"}}>
                                            {"Room: " + info.room_number}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                            {"Desk: " + info.desk_number}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text style={{color:"#434343", padding:"0px 0px 10px 100px"}}>
                                            {formatTime(info.start_time) + "-" + formatTime(info.end_time)}
                                        </Card.Text>
                                    </Row>
                                    {formatDate(info.date) === currDate && !info.checkedIn &&
                                    <Row>
                                        <button className="button-checkin" onClick={() => checkIn(info)}>Check In</button>
                                    </Row>
                                    }
                                    {formatDate(info.date) === currDate && info.checkedIn &&
                                    <Row>
                                        <button className="button-checkin" disabled>Checked In!</button>
                                    </Row>
                                    }
                            </Card>
}
                        </div>
                    )
                    }
                </div>
            </Col>
        </div>
    )

}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(CurrentSchedule);
