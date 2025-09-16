import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import {useUserProfile} from "../../../hooks/useUserProfile.ts";
import type {Product} from "../../../types/productsGet.ts";

const ProductsList = ({ products, onEdit, onDelete }: {
    products: Product[];
    onEdit: (prod: Product) => void;
    onDelete: (id: number) => void;
}) => {
    const {user} = useUserProfile();

    return (
        <DataTable
            data={products}
            columns={[
                { id: "id", label: "ID" },
                { id: "name", label: "Name" },
                { id: "description", label: "Description" },
                { id: "location", label: "Location" },
                { id: "price", label: "Price", render: (p: Product) => `${p.price}` },
                { id: "stock", label: "Stock" },
                { id: "category", label: "Category" },
                {
                    id: "actions",
                    label: "Actions",
                    align: "right",
                    render: (p: Product) => (
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                            {user?.role === "admin" || user?.role === "manager" ? (
                                <>
                                    <IconButton onClick={() => onEdit(p)}>
                                        <Edit sx={{ color: "#00AEEF" }} />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(p.id)}>
                                        <Delete sx={{ color: "red" }} />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                <IconButton onClick={() => onEdit(p)}>
                                    <Edit sx={{ color: "#00AEEF" }} />
                                </IconButton>

                                    <IconButton
                                        disabled
                                        sx={{
                                            "&.Mui-disabled": {
                                                cursor: "not-allowed !important",
                                                pointerEvents: "auto",
                                            },
                                        }}
                                    >
                                        <Delete sx={{ color: "grey" }} />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    ),
                },
            ]}
        />
    );
};

export default ProductsList;
