import React from 'react';
import { connect } from "react-redux";
import CurrentSchedule from "./current-schedule.component";
import IllnessReport from "./illness-report.component";

const DashboardUser = (props) => {
  return (
    <div>
      <h2 style={{color:"white", paddingLeft:"3rem"}}> User Dashboard </h2>
      <IllnessReport/>
      <CurrentSchedule/>
    </div>
  );
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardUser);
