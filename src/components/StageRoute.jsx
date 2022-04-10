import React from "react";
import { useSelector } from "react-redux";

import { getSelfUserStageSelector } from "@redux/users";
import StageRedirect from "@components/StageRedirect";

const StageRoute = ({ stage: expectedStage, children }) => {
  const stage = useSelector(getSelfUserStageSelector);
  console.debug("stage: " + stage);
  const decision = (() => {
    if (expectedStage.includes) {
      return expectedStage.includes(stage);
    } else {
      return stage === expectedStage;
    }
  })();

  return decision ? children : <StageRedirect />;
};

export default StageRoute;
