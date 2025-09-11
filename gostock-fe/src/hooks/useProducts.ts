import { useState, useEffect } from "react";
import { getProducts } from "../services/products.ts";
import type {Product} from "../types/productsGet.ts";

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

    const handleSave = (prod: Product) => {
        if (prod.id === 0) {
            const newProd = { ...prod, id: products.length + 1 };
            setProducts([...products, newProd]);
        } else {
            setProducts(products.map((p) => (p.id === prod.id ? prod : p)));
        }
        setEditingProduct(null);
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((p) => p.id !== id));
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
