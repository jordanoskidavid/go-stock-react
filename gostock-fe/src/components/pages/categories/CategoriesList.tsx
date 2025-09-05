import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    TableContainer,
    Paper,
    TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React, { useState } from "react";
import type { Category } from "../../../pages/Categories.tsx";

type Props = {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
};

const CategoriesList = ({ categories, onEdit, onDelete }: Props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (!categories.length) return <Typography>No categories found.</Typography>;

    return (
        <Paper
            sx={{
                backgroundColor: "#002A41",
                borderRadius: 2,
                maxWidth: 900,
                width: "100%",
                mx: "auto",
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#e3f2fd" }}>ID</TableCell>
                            <TableCell sx={{ color: "#e3f2fd" }}>Name</TableCell>
                            <TableCell sx={{ color: "#e3f2fd" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell sx={{ color: "#e3f2fd" }}>{cat.id}</TableCell>
                                    <TableCell sx={{ color: "#e3f2fd" }}>{cat.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onEdit(cat)}>
                                            <Edit sx={{ color: "#00AEEF" }} />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(cat.id)}>
                                            <Delete sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination controls */}
            <TablePagination
                component="div"
                count={categories.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5]}
                sx={{ color: "#e3f2fd" }}
            />
        </Paper>
    );
};

export default CategoriesList;
