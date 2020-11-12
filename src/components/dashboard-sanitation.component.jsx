import React from 'react';
import { connect } from "react-redux";
import CurrentSchedule from "./current-schedule.component";
import IllnessReport from "./illness-report.component";
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const DashboardSanitation = (props) => {
  return (<div>
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

export default connect(mapStateToProps)(DashboardSanitation);
