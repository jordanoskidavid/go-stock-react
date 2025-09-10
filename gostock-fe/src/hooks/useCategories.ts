import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import type {Category} from "../types/categoriesGet.ts";



export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        void fetchData();
    }, []);

    const handleSave = (category: Omit<Category, "id">, id?: number) => {
        if (id) {
            setCategories((prev) =>
                prev.map((cat) => (cat.id === id ? { ...cat, ...category } : cat))
            );
        } else {
            const newCat: Category = {
                id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
                ...category,
            };
            setCategories((prev) => [...prev, newCat]);
        }
        setEditingCategory(null);
    };

    const handleDelete = (id: number) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
    };

    return {
        categories,
        editingCategory,
        setEditingCategory,
        handleSave,
        handleDelete,
    };
};
