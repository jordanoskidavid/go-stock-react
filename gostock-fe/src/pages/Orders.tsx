import { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import OrdersList from "../components/pages/orders/OrdersList";
import FooterHome from "../components/pages/home/FooterHome";
import OrderProducts from "../components/pages/orders/OrdersHeader.tsx";
import { useOrders } from "../hooks/useOrders";
import CreateOrderDialog from "../components/pages/orders/CreateOrderDialog";
import UpdateStatusDialog from "../components/pages/orders/UpdateStatusDialog.tsx";

const Orders = () => {
    const {
        orders,
        loading,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCreate,
        handleStatusUpdate,
        handleDelete,
    } = useOrders();

    const [openCreate, setOpenCreate] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <OrderProducts />

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                <Typography variant="h4" gutterBottom color="#e3f2fd">
                    Orders
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        sx={{ width: "150px", fontWeight: "bold" }}
                        onClick={() => setOpenCreate(true)}
                    >
                        Add Order
                    </Button>
                </Box>

                <OrdersList
                    orders={orders}
                    onEdit={(o) => {
                        setSelectedOrderId(o.id);
                        setOpenStatus(true);
                    }}
                    onDelete={handleDelete}
                />
            </Box>

            {/* Create Order Modal */}
            <CreateOrderDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />

            {/* Update Status Modal */}
            {selectedOrderId && (
                <UpdateStatusDialog
                    open={openStatus}
                    orderId={selectedOrderId}
                    onClose={() => setOpenStatus(false)}
                    onUpdate={handleStatusUpdate}
                />
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%", fontWeight: "bold", boxShadow: "0px 3px 10px rgba(0,0,0,0.3)" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <FooterHome />
        </Box>
    );
};

export default Orders;
