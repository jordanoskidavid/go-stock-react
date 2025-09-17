import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import type { Order } from "../../../types/orders.ts";

const OrdersList = ({ orders, onEdit, onDelete }: {
    orders: Order[];
    onEdit: (order: Order) => void;
    onDelete: (id: number) => void;   // include here
}) => {
    return (
        <DataTable
            data={orders}
            columns={[
                { id: "id", label: "ID" },
                { id: "user_id", label: "UID" },
                {
                    id: "products",
                    label: "Products",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            {o.products.map((p) => (
                                <Box key={p.id}>{p.product.name}</Box>
                            ))}
                        </Box>
                    ),
                },

                {
                    id: "quantity",
                    label: "Quantity",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            {o.products.map((p) => (
                                <Box key={p.id}>x{p.quantity}</Box>
                            ))}
                        </Box>
                    ),
                },

                {
                    id: "price",
                    label: "Price",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            {o.products.map((p) => (
                                <Box key={p.id}>${p.price}</Box>
                            ))}
                        </Box>
                    ),
                },

                {
                    id: "total",
                    label: "Total",
                    render: (o: Order) => `$${o.total}`,
                },
                { id: "status", label: "Status" },

                {
                    id: "created_at",
                    label: "Created At",
                    render: (o: Order) => {
                        const date = new Date(o.created_at);
                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
                                <span>{date.toLocaleDateString()}</span>
                                <span>
                                    {date.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </Box>
                        );
                    },
                },

                {
                    id: "actions",
                    label: "Actions",
                    align: "right",
                    render: (o: Order) => (
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                            <IconButton onClick={() => onEdit(o)}>
                                <Edit sx={{ color: "#00AEEF" }} />
                            </IconButton>
                            <IconButton onClick={() => onDelete(o.id)}> {/* ✅ FIX */}
                                <Delete sx={{ color: "red" }} />
                            </IconButton>
                        </Box>
                    ),
                },
            ]}
        />
    );
};

export default OrdersList;
