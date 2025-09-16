import { useEffect, useState } from "react";
import {
    getCategories,
    addCategories,
    updateCategory,
    deleteCategory,
} from "../services/categories";
import type { Category } from "../types/categoriesGet.ts";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    // fetch categories
    const fetchData = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            showSnackbar("Failed to fetch categories", "error");
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    // snackbar helper
    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // save category (new or update)
    const handleSave = async (
        category: { name: string; description: string },
        id?: number
    ) => {
        setErrors({});

        // validation
        const newErrors: { name?: string; description?: string } = {};
        if (!category.name.trim()) newErrors.name = "Name is required";
        if (!category.description.trim()) newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // check if name already exists (excluding self when updating)
        const exists = categories.some(
            (cat) =>
                cat.name.toLowerCase() === category.name.toLowerCase() &&
                cat.id !== id
        );
        if (exists) {
            setErrors({ name: "Category with this name already exists" });
            showSnackbar("Category with this name already exists", "error");
            return;
        }

        try {
            if (id && id !== 0) {
                // update existing
                const response = await updateCategory(id, category);
                setCategories((prev) =>
                    prev.map((cat) => (cat.id === id ? response.data : cat))
                );
                showSnackbar("Category updated successfully", "success");
            } else {
                // create new
                const response = await addCategories(category);
                setCategories((prev) => [...prev, response.data]);
                showSnackbar("Category added successfully", "success");
            }
        } catch (err) {
            console.error("Failed to save category:", err);
            showSnackbar("Failed to save category", "error");
        }

        setEditingCategory(null);
    };

    // delete category
    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            showSnackbar("Category deleted successfully", "success");
        } catch {
            showSnackbar(
                "Failed to delete category (Check if you are deleting a category in use)",
                "error"
            );
        }
    };

    return {
        categories,
        editingCategory,
        setEditingCategory,
        handleSave,
        handleDelete,
        errors,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    };
};
