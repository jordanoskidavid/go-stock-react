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
import { useTablePagination } from "../../../hooks/useTablePagination.ts";
import type {Category} from "../../../hooks/useCategories.ts"; // your hook path

type Props = {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
};

const CategoriesList = ({ categories, onEdit, onDelete }: Props) => {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
        useTablePagination(5);

    if (!categories.length) return <Typography>No categories found.</Typography>;

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
                            <TableCell sx={{ color: "#e3f2fd", fontWeight: "bold", fontSize: "20px" }}>
                                ID
                            </TableCell>
                            <TableCell sx={{ color: "#e3f2fd", fontWeight: "bold", fontSize: "20px" }}>
                                Name
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#e3f2fd", fontWeight: "bold", fontSize: "20px" }}>
                            Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell sx={{ color: "#e3f2fd", fontSize: "20px" }}>{cat.id}</TableCell>
                                    <TableCell sx={{ color: "#e3f2fd", fontSize: "20px" }}>{cat.name}</TableCell>
                                    <TableCell  align="right">
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
