import React from 'react';
import { connect } from "react-redux";

const DashboardSanitation = (props) => {
  return (<div>Sanitation Dashboard</div>);
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardSanitation);
