import { Box, Button, Typography } from "@mui/material";
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
        handleDelete,
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
                        onSave={() => setEditingProduct(null)}
                        onCancel={() => setEditingProduct(null)}
                    />
                ) : (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                sx={{ width: "150px", fontWeight:"bold"}}
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

            <FooterHome />
        </Box>
    );
};

export default Products;
