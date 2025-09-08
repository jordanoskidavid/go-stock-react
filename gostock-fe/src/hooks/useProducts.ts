import { useState } from "react";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
};

export function useProducts(initialProducts: Product[] = []) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
    };
}
