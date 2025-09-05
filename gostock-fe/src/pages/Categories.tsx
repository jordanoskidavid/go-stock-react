import { Box, Button, Typography } from "@mui/material";
import CategoryForm from "../components/pages/categories/CategoryForm.tsx";
import CategoriesList from "../components/pages/categories/CategoriesList.tsx";
import FooterHome from "../components/pages/home/FooterHome.tsx";
import HeaderCategory from "../components/pages/categories/HeaderCategory.tsx";
import { useCategories } from "../hooks/useCategories.ts";

const Categories = () => {
    const {
        categories,
        editingCategory,
        setEditingCategory,
        handleSave,
        handleDelete,
    } = useCategories([
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Clothing" },
        { id: 4, name: "Clothing" },
        { id: 5, name: "Clothing" },
        { id: 6, name: "Clothing" },
        { id: 7, name: "Clothing" },
        { id: 8, name: "Clothing" },
    ]);

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
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    overflowY: "auto",
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
