import { Box } from "@mui/material";

import { ProductApiData, ProductApiResponse } from "@/app/types/product";
import DateCell from "@/components/DataTable/Cells/DateCell";
import DataTable, { DataTableColumn } from "@/components/DataTable/DataTable";
import PageHeader from "@/components/PageHeader";

const ProductsPage = async () => {
  const attributes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
  );

  const { data, error }: ProductApiResponse = await attributes.json();

  const columns: DataTableColumn<ProductApiData>[] = [
    {
      id: "id",
      label: "ID",
      CellRenderer: ({ item }) => {
        return <Box>{item.id}</Box>;
      },
    },

    {
      id: "skuId",
      label: "SKU ID",
      CellRenderer: ({ item }) => {
        return <Box>{item.skuId}</Box>;
      },
    },

    {
      id: "createdAt",
      label: "Created At",
      CellRenderer: ({ item }) => {
        return <DateCell millisecondTime={item.createdAt} />;
      },
    },

    {
      id: "updatedAt",
      label: "Updated At",
      CellRenderer: ({ item }) => {
        return <DateCell millisecondTime={item.updatedAt} />;
      },
    },
  ];

  return (
    <Box>
      <PageHeader title="Products" />

      <DataTable columns={columns} data={error ? [] : data.results} />
    </Box>
  );
};

export default ProductsPage;
