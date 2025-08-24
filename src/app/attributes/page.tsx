import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import React from "react";

import { AttributeApiResponse } from "@/app/api/types/attribute";
import PageHeader from "@/components/PageHeader";
import isInteger from "@/utils/validationUtils/isNumber";
import AttributesTable from "./components/AttributesTable";
import Filters from "./components/Filters";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AttributesPage = async ({ searchParams }: ProductsPageProps) => {
  const { page, rowsPerPage, orderBy, group, type, name } = await searchParams;

  /** Validate search params */
  if (!isInteger(page) || !isInteger(rowsPerPage)) {
    redirect("/attributes?page=0&rowsPerPage=100");
  }

  const parsedPage = parseInt(page as string);
  const parsedRowsPerPage = parseInt(rowsPerPage as string);
  const skipValue = parsedPage * parsedRowsPerPage;

  const orderByQuery = orderBy ? `&orderBy=${orderBy}` : "";
  const groupQuery = group ? `&group=${group}` : "";
  const typeQuery = type ? `&type=${type}` : "";
  const nameQuery = name ? `&name=${name}` : "";

  /** Fetch data from backend */
  const attributes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attributes?offset=${skipValue}&limit=${rowsPerPage}${orderByQuery}${groupQuery}${typeQuery}${nameQuery}`
  );

  const { data, error }: AttributeApiResponse = await attributes.json();

  return (
    <Box>
      <PageHeader title="Attributes" />

      <Box sx={{ padding: "8px", marginBottom: "10px" }}>
        <Filters />

        <AttributesTable
          data={error ? [] : data.results}
          totalCount={error ? 0 : data.total}
        />
      </Box>
    </Box>
  );
};

export default AttributesPage;
