import React from "react";
import { Avatar } from "@mui/material";

const CenteredRoundBox = ({ children, ...props }) => (
  <Avatar
    sx={{
      m: 1,
      backgroundColor: "primary.main",
    }}
    {...props}
  >
    {children}
  </Avatar>
);

export default CenteredRoundBox;
