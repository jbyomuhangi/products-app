"use client";

import { Box } from "@mui/material";
import React, { useMemo } from "react";

const DateCell = ({ millisecondTime }: { millisecondTime: number }) => {
  const formattedDate = useMemo(() => {
    if (!millisecondTime) return "-";

    return new Date(millisecondTime).toLocaleDateString("en-CA");
  }, [millisecondTime]);

  return <Box>{formattedDate}</Box>;
};

export default DateCell;
