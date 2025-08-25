"use client";

import { Box } from "@mui/material";
import { useMemo } from "react";

import { ProductApiData } from "@/app/api/types/product";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import DataTable, { DataTableColumn } from "@/components/DataTable";
import DateCell from "@/components/DataTable/Cells/DateCell";
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback";

interface ProductsTableProps {
  data: ProductApiData[];
  totalCount: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data, totalCount }) => {
  const columns: DataTableColumn<ProductApiData>[] = useMemo(() => {
    return [
      {
        id: "id",
        label: "ID",
        orderingKey: "id",
        CellRenderer: ({ item }) => {
          return <Box>{item.id}</Box>;
        },
      },

      {
        id: "skuId",
        label: "SKU ID",
        orderingKey: "skuId",
        CellRenderer: ({ item }) => {
          return <Box>{item.skuId}</Box>;
        },
      },

      {
        id: "createdAt",
        label: "Created At",
        orderingKey: "createdAt",
        CellRenderer: ({ item }) => {
          return <DateCell millisecondTime={item.createdAt} />;
        },
      },

      {
        id: "updatedAt",
        label: "Updated At",
        orderingKey: "updatedAt",
        CellRenderer: ({ item }) => {
          return <DateCell millisecondTime={item.updatedAt} />;
        },
      },
    ];
  }, []);

  return (
    <ClientErrorBoundary
      ErrorBoundaryProps={{ fallback: <ErrorBoundaryFallback /> }}
    >
      <DataTable columns={columns} data={data} totalCount={totalCount} />
    </ClientErrorBoundary>
  );
};

export default ProductsTable;
