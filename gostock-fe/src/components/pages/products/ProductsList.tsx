import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import type { Product } from "../../../hooks/useProducts";

const ProductsList = ({ products, onEdit, onDelete }: {
    products: Product[];
    onEdit: (prod: Product) => void;
    onDelete: (id: number) => void;
}) => {

    const categoryNames: Record<number, string> = {
        1: "Electronics",
        2: "Clothing",
        3: "Food",
    };

    return (
        <DataTable
            data={products}
            columns={[
                { id: "id", label: "ID" },
                { id: "name", label: "Name" },
                { id: "description", label: "Description" },
                { id: "price", label: "Price", render: (p: Product) => `$${p.price}` },
                { id: "stock", label: "Stock" },
                {
                    id: "category_id",
                    label: "Category",
                    render: (p: Product) => categoryNames[p.category_id] || "Unknown",
                },
                {
                    id: "actions",
                    label: "Actions",
                    align: "right",
                    render: (p: Product) => (
                        <>
                            <IconButton onClick={() => onEdit(p)}>
                                <Edit sx={{ color: "#00AEEF" }} />
                            </IconButton>
                            <IconButton onClick={() => onDelete(p.id)}>
                                <Delete sx={{ color: "red" }} />
                            </IconButton>
                        </>
                    ),
                },
            ]}
        />
    );
};

export default ProductsList;
