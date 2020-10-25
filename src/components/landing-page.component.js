import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';

const LandingPage = (props) => {
  const user = props.user;
  const history = useHistory();

  if (user.name === '') {
    return (
      <Container>
        <Row className="justify-content-md-center my-auto" style={{ padding: '30px' }}>
          <Col xs={12} style={{ textAlign: 'center' }}>
            <h3>Welcome to CleanBase</h3>
            <p>Are you a new user?  Selecte 'Create an Accont' from above.</p>
            <p>Already have an account?  Select 'Log in' above.</p>
          </Col>
        </Row>
      </Container>
    );
  } else {
    history.push("/home");
    return (<div></div>);
  }
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(LandingPage);
