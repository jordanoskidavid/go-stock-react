import { useState } from "react";

export type Category = {
    id: number;
    name: string;
};

export const useCategories = (initialCategories: Category[] = []) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
