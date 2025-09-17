import { useState, useMemo } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import { useUserProfile } from "../../../hooks/useUserProfile.ts";
import type { Product } from "../../../types/productsGet.ts";

const ProductsList = ({ products, onEdit, onDelete }: {
    products: Product[];
    onEdit: (prod: Product) => void;
    onDelete: (id: number) => void;
}) => {
    const { user } = useUserProfile();
    const [search, setSearch] = useState("");

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        if (!search) return products;
        const lowerSearch = search.toLowerCase();
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(lowerSearch) ||
                p.description.toLowerCase().includes(lowerSearch) ||
                p.location.toLowerCase().includes(lowerSearch) ||
                p.category.toLowerCase().includes(lowerSearch) ||
                p.id.toString().includes(lowerSearch) ||
                p.price.toString().includes(lowerSearch)
        );
    }, [products, search]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <TextField
                    label="Search products"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <DataTable
                data={filteredProducts}
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
        </>
    );
};

export default ProductsList;
