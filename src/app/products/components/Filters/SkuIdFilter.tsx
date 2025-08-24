"use client";

import { useState } from "react";
import { useDebounce } from "react-use";

import TextInput from "@/components/TextInput";
import useSearchParamsMap from "@/hooks/useSearchParamsMap";

const SkuIdFilter = () => {
  const { params, handleUpdateSearchParams } = useSearchParamsMap();
  const [skuId, setSkuId] = useState<string>(params.skuId || "");

  useDebounce(
    () => {
      const urlParamValue = params.skuId ?? "";
      if (skuId === urlParamValue) return;
      handleUpdateSearchParams({ newParams: { skuId: skuId || null } });
    },
    200,
    [skuId]
  );

  return (
    <TextInput
      TextFieldProps={{
        value: skuId,
        placeholder: "Search by sku id",
        onChange: (e) => {
          setSkuId(e.target.value);
        },
      }}
    />
  );
};

export default SkuIdFilter;
