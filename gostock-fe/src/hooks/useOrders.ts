import {
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder
} from "../services/orders.ts";
import {useEffect, useState} from "react";
import type {CreateOrderPayload, Order, UpdateOrderStatusPayload} from "../types/orders.ts";

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setSnackbarMessage("Failed to load orders");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Create order
    const handleCreate = async (payload: CreateOrderPayload) => {
        try {
            const created = await createOrder(payload);
            setOrders((prev) => [...prev, created]);
            setSnackbarMessage("Order created successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (err) {
            console.error("Failed to create order", err);
            setSnackbarMessage("Failed to create order");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // Update order status only
    const handleStatusUpdate = async (id: number, payload: UpdateOrderStatusPayload) => {
        try {
            const updated = await updateOrder(id, payload);
            setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
            setSnackbarMessage("Order status updated successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (err) {
            console.error("Failed to update status", err);
            setSnackbarMessage("Failed to update order status");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteOrder(id);
            setOrders((prev) => prev.filter((o) => o.id !== id));
            setSnackbarMessage("Order deleted successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (err) {
            console.error("Failed to delete order", err);
            setSnackbarMessage("Failed to delete order");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchOrders().catch((err) => console.error("Failed to fetch orders:", err));
    }, []);

    return {
        orders,
        editingOrder,
        setEditingOrder,
        loading,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCreate,
        handleStatusUpdate,
        handleDelete,
    };
};
