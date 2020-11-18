import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import CurrentSchedule from "./current-schedule.component";
import IllnessReport from "./illness-report.component";
import { Container, Row, Col} from 'react-bootstrap';
import { getUser } from "../store/selectors";
import axios from 'axios';

const DashboardManager = (props) => {
  const user = useSelector(getUser);

  useEffect(()=>{
    axios.get("http://localhost:5000/accounts/office/" + user._id)
    .then((res) => {
      console.log(res.data[0]._id)
      const update = {
        business_account_id: res.data[0]._id,
      }
      axios.post("http://localhost:5000/users/update/" + user._id, update)
      .then((response) => console.log(response))
    });
  },[]);

  return (
  <div>
    <div>
      <Container fluid>
        <Row>
          <Col style={{paddingLeft:"8%"}}>
            <IllnessReport/>
          </Col>
          <Col style={{paddingRight:"8%"}}>
            <CurrentSchedule/>
          </Col>
        </Row>
      </Container>
    </div>
  </div>);
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardManager);
