import { useEffect, useState } from "react";
import { getCategories, addCategories, updateCategory, deleteCategory } from "../services/categories";
import type { Category } from "../types/categoriesGet.ts";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [errors, setErrors] = useState<{ name?: string }>({});

    const fetchData = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const handleSave = async (category: Omit<Category, "id">, id?: number) => {
        setErrors({});

        const exists = categories.some(
            (cat) =>
                cat.name.toLowerCase() === category.name.toLowerCase() &&
                cat.id !== id
        );
        if (exists) {
            setErrors({ name: "Category with this name already exists" });
            return;
        }

        try {
            if (id && id !== 0) {
                const response = await updateCategory(id, category);
                setCategories((prev) =>
                    prev.map((cat) => (cat.id === id ? response.data : cat))
                );
            } else {
                const response = await addCategories(category);
                setCategories((prev) => [...prev, response.data]);
            }
        } catch (err) {
            console.error("Failed to save category:", err);
        }

        setEditingCategory(null);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (err) {
            console.error("Failed to delete category:", err);
        }
    };

    return {
        categories,
        editingCategory,
        setEditingCategory,
        handleSave,
        handleDelete,
        errors,
    };
};
