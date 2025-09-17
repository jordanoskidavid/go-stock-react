import { useState, useMemo } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataTable from "../../ui/dataTable";
import type { Order } from "../../../types/orders.ts";

const OrdersList = ({ orders, onEdit, onDelete }: {
    orders: Order[];
    onEdit: (order: Order) => void;
    onDelete: (id: number) => void;
}) => {
    const [search, setSearch] = useState("");

    const filteredOrders = useMemo(() => {
        if (!search) return orders;
        const lowerSearch = search.toLowerCase();
        return orders.filter((o) => {
            const productNames = o.products.map((p) => p.product.name.toLowerCase()).join(" ");
            return (
                o.id.toString().includes(lowerSearch) ||
                o.user_id.toString().includes(lowerSearch) ||
                o.status.toLowerCase().includes(lowerSearch) ||
                o.total.toString().includes(lowerSearch) ||
                productNames.includes(lowerSearch)
            );
        });
    }, [orders, search]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <TextField
                    label="Search orders"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <DataTable
                data={filteredOrders}
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
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                                <IconButton onClick={() => onDelete(o.id)}>
                                    <Delete sx={{ color: "red" }} />
                                </IconButton>
                            </Box>
                        ),
                    },
                ]}
            />
        </>
    );
};

export default OrdersList;
