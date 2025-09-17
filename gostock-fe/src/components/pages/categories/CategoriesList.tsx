import { useState, useMemo } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable.tsx";
import { useUserProfile } from "../../../hooks/useUserProfile.ts";
import type { Category } from "../../../types/categoriesGet.ts";

type Props = {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
};

const CategoriesList = ({ categories, onEdit, onDelete }: Props) => {
    const { user } = useUserProfile();
    const [search, setSearch] = useState("");

    // Filter categories based on search
    const filteredCategories = useMemo(() => {
        if (!search) return categories;
        const lowerSearch = search.toLowerCase();
        return categories.filter(
            (cat) =>
                cat.name.toLowerCase().includes(lowerSearch) ||
                cat.description.toLowerCase().includes(lowerSearch) ||
                cat.id.toString().includes(lowerSearch)
        );
    }, [categories, search]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <TextField
                    label="Search categories"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            {/* Data table */}
            <DataTable
                data={filteredCategories}
                columns={[
                    { id: "id", label: "ID" },
                    { id: "name", label: "Name" },
                    { id: "description", label: "Description" },
                    {
                        id: "actions",
                        label: "Actions",
                        align: "right",
                        render: (cat: Category) =>
                            user?.role === "admin" || user?.role === "manager" ? (
                                <>
                                    <IconButton onClick={() => onEdit(cat)}>
                                        <Edit sx={{ color: "#00AEEF" }} />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(cat.id)}>
                                        <Delete sx={{ color: "red" }} />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        disabled
                                        sx={{
                                            "&.Mui-disabled": {
                                                cursor: "not-allowed !important",
                                                pointerEvents: "auto",
                                            },
                                        }}
                                    >
                                        <Edit sx={{ color: "grey" }} />
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
                            ),
                    },
                ]}
            />
        </>
    );
};

export default CategoriesList;
