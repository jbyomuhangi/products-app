"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationBaseProps,
  TableRow,
} from "@mui/material";

import useSearchParamsMap from "@/hooks/useSearchParamsMap";
import { emptyObject } from "@/utils/noopUtils";
import { useMemo } from "react";
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

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  totalCount,
  tableRowDataKey = "id",
  isPaginationShown = true,
  TablePaginationProps = emptyObject,
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
      page: parseInt(params.page),
      rowsPerPage: parseInt(params.rowsPerPage),
    };
  }, [params]);

  const rowsPerPageOptions = useMemo(() => {
    return [10, 20, 50, 100];
  }, []);

  const hasData = data.length > 0;
  const shouldShowPagination = isPaginationShown && hasData;

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#dfeafc" }}>
            <TableRow>
              {columns.map((column) => {
                const { HeaderRenderer = HeaderCell, ...otherProps } = column;

                return (
                  <TableCell key={column.id}>
                    <HeaderRenderer column={otherProps} />
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
                          {CellRenderer && <CellRenderer item={item} />}
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
      </TableContainer>

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
