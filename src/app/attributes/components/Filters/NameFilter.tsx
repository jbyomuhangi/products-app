"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "react-use";

import useSearchParamsMap from "@/hooks/useSearchParamsMap";

const NameFilter = () => {
  const { params, handleUpdateSearchParams } = useSearchParamsMap();
  const [name, setName] = useState<string | null>(params.name || "");

  useDebounce(
    () => {
      const urlParamValue = params.name ?? "";
      if (name === urlParamValue) return;
      handleUpdateSearchParams({ newParams: { name: name || null } });
    },
    200,
    [name]
  );

  return (
    <TextField
      value={name}
      placeholder="Search by name"
      onChange={(e) => {
        setName(e.target.value);
      }}
      sx={{
        height: "40px",
        "& .MuiInputBase-root": { height: "40px", padding: 0 },
        "& input": { padding: "0px 8px" },
      }}
    />
  );
};

export default NameFilter;
