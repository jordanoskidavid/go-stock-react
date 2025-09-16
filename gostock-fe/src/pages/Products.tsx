import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import ProductForm from "../components/pages/products/ProductForm";
import ProductsList from "../components/pages/products/ProductsList";
import FooterHome from "../components/pages/home/FooterHome";
import ProductsHeader from "../components/pages/products/ProductsHeader";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
    const {
        products,
        editingProduct,
        setEditingProduct,
        handleSave,
        handleDelete,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    } = useProducts();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <ProductsHeader />

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4" gutterBottom color="#e3f2fd">
                    Products
                </Typography>

                {editingProduct ? (
                    <ProductForm
                        product={editingProduct}
                        onSave={handleSave}
                        onCancel={() => setEditingProduct(null)}
                    />
                ) : (
                    <>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            sx={{ width: "150px", fontWeight: "bold" }}
                            onClick={() =>
                                setEditingProduct({
                                    id: 0,
                                    name: "",
                                    description: "",
                                    price: 0,
                                    location: "",
                                    stock: 0,
                                    category_id: 0,
                                    category: "",
                                })
                            }
                        >
                            Add Product
                        </Button>
                    </Box>

                        <ProductsList
                            products={products}
                            onEdit={setEditingProduct}
                            onDelete={handleDelete}
                        />
                    </>
                )}
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
                    sx={{ width: "100%", fontWeight: "bold", boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                    }}                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <FooterHome />
        </Box>
    );
};

export default Products;
