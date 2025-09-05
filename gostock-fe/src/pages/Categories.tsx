import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CategoryForm from "../components/pages/categories/CategoryForm.tsx";
import CategoriesList from "../components/pages/categories/CategoriesList.tsx";
import FooterHome from "../components/pages/home/FooterHome.tsx";
import HeaderCategory from "../components/pages/categories/HeaderCategory.tsx";

export type Category = {
    id: number;
    name: string;
};

const Categories = () => {
    // ✅ Start with some mock data
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Clothing" },
        { id: 4, name: "Clothing" },
        { id: 5, name: "Clothing" },
        { id: 6, name: "Clothing" },
        { id: 7, name: "Clothing" },
        { id: 8, name: "Clothing" },
    ]);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleSave = (category: Omit<Category, "id">, id?: number) => {
        if (id) {
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === id ? { ...cat, ...category } : cat
                )
            );
        } else {
            // create
            const newCat = {
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <HeaderCategory />

            <Box
                sx={{
                    flexGrow: 1,       // 👈 same as Home page,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    overflowY: "auto", // scrolls if content too tall
                }}
            >
                <Typography variant="h4" gutterBottom color="#e3f2fd">
                    Categories
                </Typography>

                {editingCategory ? (
                    <CategoryForm
                        category={editingCategory}
                        onSave={handleSave}
                        onCancel={() => setEditingCategory(null)}
                    />
                ) : (
                    <>
                        <Button
                            variant="contained"
                            onClick={() => setEditingCategory({ id: 0, name: "" })}
                        >
                            Add Category
                        </Button>
                        <CategoriesList
                            categories={categories}
                            onEdit={(cat) => setEditingCategory(cat)}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Box>

            <FooterHome />
        </Box>

    );
};

export default Categories;
