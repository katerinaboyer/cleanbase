import React from 'react';
import { connect } from "react-redux";

const DashboardManager = (props) => {
  return (<div>Manager Dashboard</div>);
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardManager);
