// src/components/pages/categories/CategoriesList.tsx
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { Category } from "../../../hooks/useCategories.ts";
import DataTable from "../../ui/dataTable.tsx";

type Props = {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
};

const CategoriesList = ({ categories, onEdit, onDelete }: Props) => {
    return (
        <DataTable
            data={categories}
            columns={[
                { id: "id", label: "ID" },
                { id: "name", label: "Name" },
                {
                    id: "actions",
                    label: "Actions",
                    align: "right",
                    render: (cat: Category) => (
                        <>
                            <IconButton onClick={() => onEdit(cat)}>
                                <Edit sx={{ color: "#00AEEF" }} />
                            </IconButton>
                            <IconButton onClick={() => onDelete(cat.id)}>
                                <Delete sx={{ color: "red" }} />
                            </IconButton>
                        </>
                    ),
                },
            ]}
        />
    );
};

export default CategoriesList;
