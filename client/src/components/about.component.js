import React from 'react';
import { connect } from "react-redux";

import { Container, Row, Col, Card } from 'react-bootstrap';

const About = (props) => {

  return (
    <Container style={{color: "black"}}>
      <Row className="justify-content-md-center my-auto" style={{ padding: '30px' }}>
        <Col xs={12} lg={6} style={{ paddingBottom: "30px" }}>
          <Card body style={{ textAlign: 'justify'}}>
            <h3 style={{ textAlign: 'center', color: "black" }}>About CleanBase:</h3>
            <br/>
            <p style={{color: "black"}}>CleanBase allows you and your team to stay both safe and productive
             in these difficult times.  It is important to make sure that those in
             your office or workspace stay safe and take steps to prevent the spread
             of viruses.  This added over can add stress and hurt productivity.
             CleanBase takes the stress away from maintaining a safe workspace.
             All you have to do is create a business account and configure your space
             within the application.  Then, your employees can checkout desks
             with confidence as social distancing and cleaning measures are implemented
             automatically.*  The cleaning procedures in question are listed on this page.</p>
            <p style={{color: "black"}}>Ready to get started?  Sign up with the link above.
            Already have an account?  Select 'Log in'. </p>
            <p style={{color: "black"}}>*Organizations/spaces must provide their own cleaning
            staff.  CleanBase is only an organizational tool.</p>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <div>
              <h3 style={{ textAlign: 'center', color: "black" }}>Cleaning procedures:</h3>
              <br/>
              <p style={{ textIndent: "10px", color: "black" }}>- Desks are cleaned after use </p>
              <p style={{ textIndent: "10px", color: "black" }}>- Floors are fogged twice weekly</p>
              <p style={{ textIndent: "10px", color: "black" }}>- High touch surfaces are sanitized daily</p>
              <p style={{ textIndent: "40px", color: "black" }}>- Door knobs</p>
              <p style={{ textIndent: "40px", color: "black" }}>- Elavator buttons</p>
              <p style={{ textIndent: "40px", color: "black" }}>- Vending machines </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(About);
