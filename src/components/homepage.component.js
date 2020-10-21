import React, { Component } from "react";
import IllnessReport from "./illness-report.component";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <p>this is the homepage</p>
        <IllnessReport />
      </div>
    );
  }
}
