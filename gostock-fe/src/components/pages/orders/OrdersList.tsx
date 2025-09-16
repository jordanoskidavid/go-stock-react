import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import type { Order } from "../../../types/orders.ts";

const OrdersList = ({ orders, onEdit }: {
    orders: Order[];
    onEdit: (order: Order) => void;
}) => {

    return (
        <DataTable
            data={orders}
            columns={[
                { id: "id", label: "ID" },
                { id: "user_id", label: "UID" },
                { id: "status", label: "Status" },
                { id: "total", label: "Total", render: (o: Order) => `${o.total}` },
                {
                    id: "created_at",
                    label: "Created At",
                    render: (o: Order) => {
                        const date = new Date(o.created_at);
                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
                                <span>{date.toLocaleDateString()}</span>
                                <span>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </Box>
                        );
                    },
                },

                {
                    id: "products",
                    label: "Products",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            {o.products.map((p) => (
                                <Box
                                    key={p.id}
                                    sx={{
                                        whiteSpace: "nowrap", // prevent line breaks
                                        overflow: "hidden",    // truncate if too long
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {p.product.name} (x{p.quantity}) - ${p.price}
                                </Box>
                            ))}
                        </Box>
                    ),
                },

                {
                    id: "actions",
                    label: "Actions",
                    align: "right",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                <>
                                    <IconButton onClick={() => onEdit(o)}>
                                        <Edit sx={{ color: "#00AEEF" }} />
                                    </IconButton>
                                    <IconButton onClick={() => console.log("Delete order placeholder", o.id)}>
                                        <Delete sx={{ color: "red" }} />
                                    </IconButton>
                                </>
                        </Box>
                    ),
                },
            ]}
        />
    );
};

export default OrdersList;
