import { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert, TextField } from "@mui/material";
import OrdersList from "../components/pages/orders/OrdersList";
import FooterHome from "../components/pages/home/FooterHome";
import OrderProducts from "../components/pages/orders/OrdersHeader.tsx";
import { useOrders } from "../hooks/useOrders";
import CreateOrderDialog from "../components/pages/orders/CreateOrderDialog";
import UpdateStatusDialog from "../components/pages/orders/UpdateStatusDialog.tsx";
import { getOrdersReport, getOrdersReportByDate } from "../services/orders.ts";
import { useUserProfile } from "../hooks/useUserProfile.ts";

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

    const { user } = useUserProfile();

    const [openCreate, setOpenCreate] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    // Date state
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");

    const handleDownloadByDate = () => {
        if (!fromDate || !toDate) return;
        getOrdersReportByDate(fromDate, toDate);
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <OrderProducts />

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                <Typography variant="h4" gutterBottom color="#e3f2fd">
                    Orders
                </Typography>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mt: -5,
                        alignItems: "center", // center vertically
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ width: 150, fontWeight: "bold", height: 40 }}
                        onClick={() => setOpenCreate(true)}
                    >
                        Add Order
                    </Button>

                    {(user?.role === "admin" || user?.role === "manager") && (
                        <>
                            <Button
                                variant="contained"
                                sx={{ width: 150, fontWeight: "bold", height: 40 }}
                                onClick={getOrdersReport}
                            >
                                Get Report
                            </Button>

                            {/* Date pickers */}
                            <TextField
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                size="small"
                                sx={{ height: 40 }} // match button height
                            />

                            <TextField
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                size="small"
                                sx={{ height: 40 }}
                            />

                            <Button
                                variant="contained"
                                sx={{ width: 150, fontWeight: "bold", height: 40, padding: 2 }}
                                onClick={handleDownloadByDate}
                            >
                                Stock by date
                            </Button>
                        </>
                    )}
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

            <CreateOrderDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />

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
