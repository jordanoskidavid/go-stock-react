import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TableContainer,
    Paper,
    TablePagination,
} from "@mui/material";
import { useTablePagination } from "../../hooks/useTablePagination.ts";
import React from "react";

type Column<T> = {
    id: keyof T | string;
    label: string;
    align?: "left" | "right" | "center";
    render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    rowsPerPageOptions?: number[];
};

function DataTable<T extends { id: number }>({
                                                 data,
                                                 columns,
                                                 rowsPerPageOptions = [5,10],
                                             }: DataTableProps<T>) {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
        useTablePagination(rowsPerPageOptions[0]);

    if (!data.length) return <Typography>No records found.</Typography>;

    return (
        <Paper
            sx={{
                backgroundColor: "#002A41",
                borderRadius: 5,
                maxWidth: 900,
                width: "100%",
                mx: "auto",
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.id.toString()}
                                    align={col.align || "left"}
                                    sx={{ color: "#e3f2fd", fontWeight: "bold", fontSize: "18px" }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id}>
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.id.toString()}
                                            align={col.align || "left"}
                                            sx={{ color: "#e3f2fd", fontSize: "16px" }}
                                        >
                                            {col.render ? col.render(row) : (row[col.id as keyof T] as any)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                sx={{ color: "#e3f2fd" }}
            />
        </Paper>
    );
}

export default DataTable;
