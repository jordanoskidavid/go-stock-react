import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable.tsx";
import {useUserProfile} from "../../../hooks/useUserProfile.ts";
import type {Category} from "../../../types/categoriesGet.ts";

type Props = {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
};
const CategoriesList = ({ categories, onEdit, onDelete }: Props) => {
    const {user} = useUserProfile();
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
                        user?.role === "admin" || user?.role === "manager" ? (<>
                            <IconButton onClick={() => onEdit(cat)}>
                                <Edit sx={{ color: "#00AEEF" }} />
                            </IconButton>
                            <IconButton onClick={() => onDelete(cat.id)}>
                                <Delete sx={{ color: "red" }} />
                            </IconButton>
                        </>) : (
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
                                    <Delete sx={{ color: "grey", cursor: "not-allowed" }} />
                                </IconButton>
                            </>
                        )
                    ),
                },
            ]}
        />
    );
};

export default CategoriesList;
