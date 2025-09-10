import { Box, Button, Typography } from "@mui/material";
import CategoryForm from "../components/pages/categories/CategoryForm.tsx";
import CategoriesList from "../components/pages/categories/CategoriesList.tsx";
import FooterHome from "../components/pages/home/FooterHome.tsx";
import HeaderCategory from "../components/pages/categories/HeaderCategory.tsx";
import { useCategories } from "../hooks/useCategories.ts";
import {useUserProfile} from "../hooks/useUserProfile.ts";

const Categories = () => {
    const {
        categories,
        editingCategory,
        setEditingCategory,
        handleSave,
        handleDelete,
    } = useCategories();
    const{ user } = useUserProfile();
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
                    user?.role === "admin" ? (<>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Button
                                variant="contained"
                                sx={{ width: "150px", fontWeight:"bold"}}
                                onClick={() => setEditingCategory({ id: 0, name: "" })}
                            >
                                Add Category
                            </Button>
                        </Box>

                        <CategoriesList
                            categories={categories}
                            onEdit={(cat) => setEditingCategory(cat)}
                            onDelete={handleDelete}
                        />
                    </>) : (
                        <>
                            <CategoriesList
                                categories={categories}
                                onEdit={(cat) => setEditingCategory(cat)}
                                onDelete={handleDelete}
                            />
                        </>
                    )

                )}
            </Box>

            <FooterHome />
        </Box>
    );
};

export default Categories;
