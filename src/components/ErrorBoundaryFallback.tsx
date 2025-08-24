import { Box } from "@mui/material";
import React from "react";

const ErrorBoundaryFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        textAlign: "center",
      }}
    >
      An error occurred in this component. Please contact support if this
      persists.
    </Box>
  );
};

export default ErrorBoundaryFallback;
