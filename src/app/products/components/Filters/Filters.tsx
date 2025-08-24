"use client";

import { Box } from "@mui/material";
import SkuIdFilter from "./SkuIdFilter";

const Filters = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "10px 0px",
        alignItems: "center",
      }}
    >
      <SkuIdFilter />
    </Box>
  );
};

export default Filters;
