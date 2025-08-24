"use client";

import { Box } from "@mui/material";
import { useMemo } from "react";

import { AttributeApiData } from "@/app/api/types/attribute";
import DateCell from "@/components/DataTable/Cells/DateCell";
import DataTable, { DataTableColumn } from "@/components/DataTable/DataTable";

interface AttributesTableProps {
  data: AttributeApiData[];
  totalCount: number;
}

const AttributesTable: React.FC<AttributesTableProps> = ({
  data,
  totalCount,
}) => {
  const columns: DataTableColumn<AttributeApiData>[] = useMemo(() => {
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
        id: "name",
        label: "Name",
        orderingKey: "name",
        CellRenderer: ({ item }) => {
          return <Box>{item.name}</Box>;
        },
      },

      {
        id: "type",
        label: "Type",
        orderingKey: "type",
        CellRenderer: ({ item }) => {
          return <Box>{item.type}</Box>;
        },
      },

      {
        id: "group",
        label: "Group",
        orderingKey: "group",
        CellRenderer: ({ item }) => {
          return <Box>{item.group}</Box>;
        },
      },

      {
        id: "description",
        label: "Description",
        orderingKey: "description",
        CellRenderer: ({ item }) => {
          return <Box>{item.description}</Box>;
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

  return <DataTable columns={columns} data={data} totalCount={totalCount} />;
};

export default AttributesTable;
