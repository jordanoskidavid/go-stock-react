import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import type { Category } from "../../../types/categoriesGet.ts";

type Props = {
    category: Category;
    onSave: (cat: { name: string; description: string }, id?: number) => void;
    onCancel: () => void;
};

const CategoryForm = ({ category, onSave, onCancel }: Props) => {
    const [name, setName] = useState(category.name || "");
    const [description, setDescription] = useState(category.description || "");
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

    const handleSubmit = () => {
        const newErrors: { name?: string; description?: string } = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!description.trim()) newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const catData = { name, description };
        if (category.id) {
            onSave(catData, category.id);
        } else {
            onSave(catData);
        }
    };

    const handleChange = (field: "name" | "description", value: string) => {
        if (field === "name") {
            setName(value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }
        if (field === "description") {
            setDescription(value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#002A41",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
            >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#e3f2fd" },
                            "&:hover fieldset": { borderColor: "#00AEEF" },
                            "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
                        },
                        "& .MuiInputBase-input": { color: "#e3f2fd" },
                        "& .MuiInputLabel-root": { color: "#e3f2fd" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
                    }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#e3f2fd" },
                            "&:hover fieldset": { borderColor: "#00AEEF" },
                            "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
                        },
                        "& .MuiInputBase-input": { color: "#e3f2fd" },
                        "& .MuiInputLabel-root": { color: "#e3f2fd" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
                    }}
                />

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#008DDA",
                            "&:hover": { backgroundColor: "#00AEEF" },
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        sx={{
                            color: "#e3f2fd",
                            borderColor: "#e3f2fd",
                            "&:hover": { borderColor: "#00AEEF", color: "#00AEEF" },
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CategoryForm;
