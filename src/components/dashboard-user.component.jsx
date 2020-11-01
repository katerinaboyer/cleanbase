import React from 'react';
import { connect } from "react-redux";
import CurrentSchedule from "./current-schedule.component";
import IllnessReport from "./illness-report.component";
import { Container, Row, Col } from 'react-bootstrap';

const DashboardUser = (props) => {
  return (
    <div>
      <h2 style={{color:"white", paddingLeft:"3rem"}}> User Dashboard </h2>
      <Container>
        <Row>
          <Col>
            <IllnessReport/>
          </Col>
          <Col>
            <CurrentSchedule/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardUser);
