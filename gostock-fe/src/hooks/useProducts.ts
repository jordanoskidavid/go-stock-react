import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/products.ts";
import type { Product } from "../types/productsGet.ts";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Could not load products");
            } finally {
                setLoading(false);
            }
        };
        void fetchData();
    }, []);

    const handleSave = async (prod: Product) => {
        try {
            if (prod.id === 0) {
                // ADD product to backend
                const response = await addProduct({
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    stock: prod.stock,
                    category_id: prod.category_id,
                });
                // add returned product to local state
                setProducts((prev) => [...prev, response.data]);
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
            }
        } catch (err) {
            console.error("Failed to save product:", err);
        } finally {
            setEditingProduct(null);
        }
    };
    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Failed to delete product:", err);
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
    };
}
