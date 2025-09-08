import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
};

type Props = {
    product: Product;
    onSave: (prod: Product) => void;
    onCancel: () => void;
};

const ProductForm = ({ product, onSave, onCancel }: Props) => {
    const [form, setForm] = useState(product);

    const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});

    const handleChange = <K extends keyof Product>(key: K, value: Product[K]) => {
        setForm({ ...form, [key]: value });
        setErrors((prev) => ({ ...prev, [key]: "" })); // clear error on change
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof Product, string>> = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (form.price <= 0) newErrors.price = "Price must be greater than 0";
        if (form.stock < 0) newErrors.stock = "Stock cannot be negative";
        if (!form.category_id) newErrors.category_id = "Category is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSave(form);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", maxWidth: 500, p: 4, borderRadius: 3, backgroundColor: "#002A41", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                <TextField
                    label="Name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ "& .MuiInputBase-input": { color: "#e3f2fd" }, "& .MuiInputLabel-root": { color: "#e3f2fd" } }}
                />
                <TextField
                    label="Description"
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ "& .MuiInputBase-input": { color: "#e3f2fd" }, "& .MuiInputLabel-root": { color: "#e3f2fd" } }}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={form.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    error={!!errors.price}
                    helperText={errors.price}
                    sx={{ "& .MuiInputBase-input": { color: "#e3f2fd" }, "& .MuiInputLabel-root": { color: "#e3f2fd" } }}
                />
                <TextField
                    label="Stock"
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleChange("stock", Number(e.target.value))}
                    error={!!errors.stock}
                    helperText={errors.stock}
                    sx={{ "& .MuiInputBase-input": { color: "#e3f2fd" }, "& .MuiInputLabel-root": { color: "#e3f2fd" } }}
                />
                <TextField
                    select
                    label="Category"
                    value={form.category_id}
                    onChange={(e) => handleChange("category_id", Number(e.target.value))}
                    error={!!errors.category_id}
                    helperText={errors.category_id}
                    sx={{ "& .MuiInputBase-input": { color: "#e3f2fd" }, "& .MuiInputLabel-root": { color: "#e3f2fd" } }}
                >
                    <MenuItem value={1}>Electronics</MenuItem>
                    <MenuItem value={2}>Clothing</MenuItem>
                    <MenuItem value={3}>Food</MenuItem>
                </TextField>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#008DDA", "&:hover": { backgroundColor: "#00AEEF" }, borderRadius: 2, px: 3 }}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={onCancel} sx={{ color: "#e3f2fd", borderColor: "#e3f2fd", "&:hover": { borderColor: "#00AEEF", color: "#00AEEF" }, borderRadius: 2, px: 3 }}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductForm;
