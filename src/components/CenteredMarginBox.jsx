import { Box } from "@mui/system";
import React from "react";

const CenteredMarginBox = ({ children, ...props }) => (
  <Box
    sx={{
      mt: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

export default CenteredMarginBox;
