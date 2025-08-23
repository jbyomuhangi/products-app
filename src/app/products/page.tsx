import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import { ProductApiResponse } from "@/app/types/product";
import PageHeader from "@/components/PageHeader";
import isInteger from "@/utils/validationUtils/isNumber";
import ProductsTable from "./components/ProductsTable";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page, rowsPerPage } = await searchParams;

  if (!isInteger(page) || !isInteger(rowsPerPage)) {
    redirect("/products?page=1&rowsPerPage=10");
  }

  const attributes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?offset=${page}&limit=${rowsPerPage}`
  );

  const { data, error }: ProductApiResponse = await attributes.json();

  return (
    <Box>
      <PageHeader title="Products" />

      <Box sx={{ padding: "8px", marginBottom: "10px" }}>
        <ProductsTable
          data={error ? [] : data.results}
          totalCount={data?.total || 0}
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
