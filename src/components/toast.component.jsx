import React from 'react';
import { connect } from "react-redux";
import { Toast } from "react-bootstrap";

const ToastMessage = (props) => {
  return (
    <Toast
      show={props.show}
      style={{
        position: 'fixed',
        right: 30,
        top: 100,
        backgroundColor: props.error ? '#EE6C4D' : '#00A8FF',
        color: 'white',
      }}
    >
      <Toast.Body>{props.text}</Toast.Body>
    </Toast>
  )
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(ToastMessage);
