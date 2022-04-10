import React from "react";
import DashboardFrame from "./DashboardFrame";
import StageRoute from "./StageRoute";

const MainElement = () => {
  return (
    <StageRoute stage={0}>
      <DashboardFrame />
    </StageRoute>
  );
};

export default MainElement;
