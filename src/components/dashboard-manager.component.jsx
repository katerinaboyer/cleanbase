import React from 'react';
import { connect } from "react-redux";
import CurrentSchedule from "./current-schedule.component";
import IllnessReport from "./illness-report.component";

const DashboardManager = (props) => {
  return (
  <div>
    <IllnessReport/>
    <CurrentSchedule/>
  </div>);
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardManager);
