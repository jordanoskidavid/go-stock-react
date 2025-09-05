import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import type {Category} from "../../../pages/Categories.tsx";

type Props = {
    category: Category;
    onSave: (cat: { name: string }, id?: number) => void;
    onCancel: () => void;
};

const CategoryForm = ({ category, onSave, onCancel }: Props) => {
    const [name, setName] = useState(category.name);

    const handleSubmit = () => {
        const catData = { name };
        if (category.id) {
            onSave(catData, category.id);
        } else {
            onSave(catData);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default CategoryForm;
