"use client";

import { useMemo } from "react";
import Select from "react-select";

import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import { AttributeFieldType, AttributeGroup } from "@/enums/attribute";
import useIsMounted from "@/hooks/useIsMounted";
import useSearchParamsMap from "@/hooks/useSearchParamsMap";
import { Box } from "@mui/material";
import NameFilter from "./NameFilter";

const Filters = () => {
  const isMounted = useIsMounted();
  const { params, handleUpdateSearchParams } = useSearchParamsMap();

  const typeFilterOptions = useMemo(() => {
    return Object.values(AttributeFieldType).map((type) => ({
      value: type,
      label: type,
    }));
  }, []);

  const groupFilterOptions = useMemo(() => {
    return Object.values(AttributeGroup).map((group) => ({
      value: group,
      label: group,
    }));
  }, []);

  const typeValue = useMemo(() => {
    return (
      typeFilterOptions.find((option) => option.value === params.type) || null
    );
  }, [params.type, typeFilterOptions]);

  const groupValue = useMemo(() => {
    return (
      groupFilterOptions.find((option) => option.value === params.group) || null
    );
  }, [params.group, groupFilterOptions]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "10px 0px",
        alignItems: "center",
      }}
    >
      <ClientErrorBoundary>
        <NameFilter />
      </ClientErrorBoundary>

      {isMounted && (
        <ClientErrorBoundary>
          <Box sx={{ width: "200px" }}>
            <Select
              isClearable
              placeholder="Type"
              value={typeValue}
              options={typeFilterOptions}
              onChange={(newValue) => {
                handleUpdateSearchParams({
                  newParams: { type: newValue?.value ?? null },
                });
              }}
            />
          </Box>
        </ClientErrorBoundary>
      )}

      {isMounted && (
        <ClientErrorBoundary>
          <Box sx={{ width: "200px" }}>
            <Select
              isClearable
              placeholder="Group"
              value={groupValue}
              options={groupFilterOptions}
              onChange={(newValue) => {
                handleUpdateSearchParams({
                  newParams: { group: newValue?.value ?? null },
                });
              }}
            />
          </Box>
        </ClientErrorBoundary>
      )}
    </Box>
  );
};

export default Filters;
