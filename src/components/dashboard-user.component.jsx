import React from 'react';
import { connect } from "react-redux";

const DashboardUser = (props) => {
  return (<div>User Dashboard</div>);
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardUser);
