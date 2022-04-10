import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getSelfUserStageSelector } from "@redux/users";

export const getStageRedirectTo = (stage) => {
  switch (stage) {
    case -1:
      return "/login";
    default:
      return "/";
  }
};

const StageRedirect = ({ ...rest }) => {
  const stage = useSelector(getSelfUserStageSelector);

  const to = getStageRedirectTo(stage);

  return <Navigate to={to} {...rest} />;
};

export default StageRedirect;
