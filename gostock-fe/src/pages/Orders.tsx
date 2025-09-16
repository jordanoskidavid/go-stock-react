import { Alert, Box, Snackbar, Typography } from "@mui/material";
import OrdersList from "../components/pages/orders/OrdersList";
import FooterHome from "../components/pages/home/FooterHome";
import { useOrders } from "../hooks/useOrders";
import OrderProducts from "../components/pages/orders/OrdersHeader.tsx";
import {Button} from "@mui/material";

const Orders = () => {
    const {
        orders,
        setEditingOrder,
        loading,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    } = useOrders();

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <OrderProducts/>

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                <Typography variant="h4" gutterBottom color="#e3f2fd">
                    Orders
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        sx={{ width: "150px", fontWeight: "bold" }}
                    >
                        Add Order
                    </Button>
                </Box>

                <OrdersList
                    orders={orders}
                    onEdit={setEditingOrder}
                />
            </Box>

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
