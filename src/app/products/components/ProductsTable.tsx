"use client";

import { Box } from "@mui/material";
import { useMemo } from "react";

import { ProductApiData } from "@/app/types/product";
import DateCell from "@/components/DataTable/Cells/DateCell";
import DataTable, { DataTableColumn } from "@/components/DataTable/DataTable";

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
  }, []);

  return <DataTable columns={columns} data={data} totalCount={totalCount} />;
};

export default ProductsTable;
