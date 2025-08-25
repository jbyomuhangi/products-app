"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TablePaginationBaseProps,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";

import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback";
import useSearchParamsMap from "@/hooks/useSearchParamsMap";
import HeaderCell, { Column } from "./Cells/HeaderCell";

export interface DataTableColumn<T> extends Column {
  HeaderRenderer?: React.FC<{ column: Column }>;
  CellRenderer?: React.FC<{ item: T }>;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  totalCount: number;
  tableRowDataKey?: string;
  isPaginationShown?: boolean;
  TablePaginationProps?: TablePaginationBaseProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  totalCount,
  tableRowDataKey = "id",
  isPaginationShown = true,
  TablePaginationProps,
}: DataTableProps<T>) => {
  const { params, handleUpdateSearchParams } = useSearchParamsMap();

  const handleChangePage = (event: unknown, newPage: number) => {
    handleUpdateSearchParams({ newParams: { page: String(newPage) } });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleUpdateSearchParams({
      newParams: { page: "0", rowsPerPage: String(event.target.value) },
    });
  };

  const { page, rowsPerPage } = useMemo(() => {
    return {
      page: parseInt(params.page || ""),
      rowsPerPage: parseInt(params.rowsPerPage || ""),
    };
  }, [params]);

  const rowsPerPageOptions = useMemo(() => {
    return [10, 20, 50, 100];
  }, []);

  const hasData = data.length > 0;
  const shouldShowPagination = isPaginationShown && hasData;

  return (
    <Box>
      <Table data-testid="data-table">
        <TableHead
          sx={{
            backgroundColor: "#dfeafc",
            position: "sticky",
            top: 0,
          }}
        >
          <TableRow>
            {columns.map((column) => {
              const { HeaderRenderer = HeaderCell, ...otherProps } = column;

              return (
                <TableCell key={column.id}>
                  <ClientErrorBoundary
                    ErrorBoundaryProps={{ fallback: <ErrorBoundaryFallback /> }}
                  >
                    <HeaderRenderer column={otherProps} />
                  </ClientErrorBoundary>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        {hasData && (
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow
                  key={item[tableRowDataKey]}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f7f7f7",
                    },
                  }}
                >
                  {columns.map((column) => {
                    const { CellRenderer } = column;

                    return (
                      <TableCell key={column.id}>
                        <ClientErrorBoundary>
                          {CellRenderer && <CellRenderer item={item} />}
                        </ClientErrorBoundary>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        )}

        {!hasData && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      {shouldShowPagination && (
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          page={page}
          count={totalCount}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          {...TablePaginationProps}
        />
      )}
    </Box>
  );
};

export default DataTable;
