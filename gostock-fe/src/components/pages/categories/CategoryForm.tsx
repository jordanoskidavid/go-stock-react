import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import type {Category} from "../../../types/categoriesGet.ts";

type Props = {
    category: Category;
    onSave: (cat: { name: string }, id?: number) => void;
    onCancel: () => void;
};

const CategoryForm = ({ category, onSave, onCancel }: Props) => {
    const [name, setName] = useState(category.name);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        const catData = { name };
        if (category.id) {
            onSave(catData, category.id);
        } else {
            onSave(catData);
        }
    };

    const handleChange = (value: string) => {
        setName(value);
        if (error) setError(""); // clear error on change
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
                    onChange={(e) => handleChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    error={!!error}
                    helperText={error}
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
