import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import BuildingAdminDash from './building-admin-homepage.component';
import DashboardManager from './dashboard-manager.component';
import DashboardUser from './dashboard-user.component';
import DashboardSanitation from './dashboard-sanitation.component';

const DashboardIndex = (props) => {
  const history = useHistory();

  switch (props.user.role) {
    case 'building_admin':
      return <BuildingAdminDash />;
    case 'office_manager':
      return <DashboardManager />;
    case 'employee':
      return <DashboardUser />;
    case 'sanitation':
      return <DashboardSanitation />;
    default:
      history.push('/');
      return <div />;
  };
}

const mapStateToProps = (state) => {return state};

export default connect(mapStateToProps)(DashboardIndex);
