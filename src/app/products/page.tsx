import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import { ProductApiResponse } from "@/app/api/types/product";
import PageHeader from "@/components/PageHeader";
import isInteger from "@/utils/validationUtils/isNumber";
import ProductsTable from "./components/ProductsTable";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page, rowsPerPage, orderBy } = await searchParams;

  /** Validate search params */
  if (!isInteger(page) || !isInteger(rowsPerPage)) {
    redirect("/products?page=0&rowsPerPage=100");
  }

  const parsedPage = parseInt(page as string);
  const parsedRowsPerPage = parseInt(rowsPerPage as string);
  const skipValue = parsedPage * parsedRowsPerPage;

  const orderByQuery = orderBy ? `&orderBy=${orderBy}` : "";

  /** Fetch data from backend */
  const attributes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?offset=${skipValue}&limit=${rowsPerPage}${orderByQuery}`
  );

  const { data, error }: ProductApiResponse = await attributes.json();

  return (
    <Box>
      <PageHeader title="Products" />

      <Box sx={{ padding: "8px", marginBottom: "10px" }}>
        <ProductsTable
          data={error ? [] : data.results}
          totalCount={error ? 0 : data.total}
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
