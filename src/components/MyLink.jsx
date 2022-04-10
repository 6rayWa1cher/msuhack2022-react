import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const MyLink = ({ to, href, children, ...props }) => (
  <Link to={to} href={href} variant="body2" {...props}>
    <Box
      sx={{
        color: "primary.main",
      }}
    >
      {children}
    </Box>
  </Link>
);

export default MyLink;
