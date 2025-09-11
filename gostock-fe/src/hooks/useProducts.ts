import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/products.ts";
import type { Product } from "../types/productsGet.ts";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch {
                setError("Could not load products");
                showSnackbar("Failed to fetch products", "error");
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, []);

    const handleSave = async (prod: Product) => {
        try {
            if (prod.id === 0) {
                // ADD product
                const response = await addProduct({
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    stock: prod.stock,
                    category_id: prod.category_id,
                });
                setProducts((prev) => [...prev, response.data]);
                showSnackbar("Product added successfully", "success");
            } else {
                // UPDATE product
                const response = await updateProduct(prod.id, {
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    stock: prod.stock,
                    category_id: prod.category_id,
                });
                setProducts((prev) =>
                    prev.map((p) => (p.id === prod.id ? response.data : p))
                );
                showSnackbar("Product updated successfully", "success");
            }
        } catch {
            showSnackbar("Failed to save product", "error");
        } finally {
            setEditingProduct(null);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            showSnackbar("Product deleted successfully", "success");
        } catch {
            showSnackbar("Failed to delete product", "error");
        }
    };

    return {
        products,
        editingProduct,
        setEditingProduct,
        handleSave,
        handleDelete,
        loading,
        error,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    };
}
