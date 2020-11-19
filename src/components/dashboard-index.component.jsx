import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import BuildingAdminDash from './dashboard-admin.component';
import DashboardManager from './dashboard-manager.component';
import DashboardUser from './dashboard-user.component';
import DashboardSanitation from './dashboard-sanitation.component';
import { getUser } from "../store/selectors";
import axios from 'axios';

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
