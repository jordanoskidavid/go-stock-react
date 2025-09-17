import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, IconButton, MenuItem, Select, FormControl, InputLabel, TextField
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import type { CreateOrderPayload } from "../../../types/orders.ts";
import { getProducts } from "../../../services/products.ts";
import type { Product } from "../../../types/productsGet.ts";
import { useUserProfile } from "../../../hooks/useUserProfile.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (payload: CreateOrderPayload) => void;
}

export default function CreateOrderDialog({ open, onClose, onCreate }: Props) {
    const { user } = useUserProfile();
    const userId = user?.id;

    const [products, setProducts] = useState<{ product_id: number; quantity: number }[]>([
        { product_id: 0, quantity: 1 },
    ]);

    const [allProducts, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setAllProducts).catch(console.error);
    }, []);

    const handleAddProduct = () =>
        setProducts((prev) => [...prev, { product_id: 0, quantity: 1 }]);

    const handleRemoveProduct = (index: number) =>
        setProducts((prev) => prev.filter((_, i) => i !== index));

    const handleChange = (index: number, field: "product_id" | "quantity", value: number) => {
        const updated = [...products];
        updated[index][field] = value;
        setProducts(updated);
    };

    const handleSubmit = () => {
        if (!userId) return;
        onCreate({ user_id: userId, products });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    backgroundColor: "#002A41",
                    color: "#e3f2fd",
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                Create Order
            </DialogTitle>

            <DialogContent
                sx={{
                    backgroundColor: "#002A41",
                    p: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt:1,
                        width: "100%",
                    }}
                >
                    {products.map((p, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <FormControl fullWidth>
                                <InputLabel
                                    id={`product-label-${i}`}
                                    sx={{ color: "#e3f2fd" }}
                                >
                                    Product
                                </InputLabel>
                                <Select
                                    labelId={`product-label-${i}`}
                                    value={p.product_id}
                                    onChange={(e) =>
                                        handleChange(i, "product_id", Number(e.target.value))
                                    }
                                    label="Product"
                                    sx={{
                                        color: "#e3f2fd",
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e3f2fd" },
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#00AEEF" },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00AEEF" },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 48 * 5, // 5 items × item height (48px default)
                                                width: 250,
                                            },
                                        },
                                    }}
                                >
                                    {allProducts.map((prod) => (
                                        <MenuItem key={prod.id} value={prod.id}>
                                            {prod.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <TextField
                                label="Quantity"
                                type="number"
                                value={p.quantity}
                                onChange={(e) =>
                                    handleChange(i, "quantity", Number(e.target.value))
                                }
                                sx={{
                                    width: 120, // fix width to prevent shrinking
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

                            <IconButton
                                onClick={() => handleRemoveProduct(i)}
                                sx={{ color: "#FF6B6B" }}
                            >
                                <Remove />
                            </IconButton>
                        </Box>

                    ))}

                    <Button
                        startIcon={<Add />}
                        onClick={handleAddProduct}
                        sx={{
                            alignSelf: "flex-start",
                            backgroundColor: "#008DDA",
                            "&:hover": { backgroundColor: "#00AEEF" },
                            borderRadius: 2,
                            px: 3,
                            color: "#fff",
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{ backgroundColor: "#002A41", p: 3, display: "flex", gap: 2 }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
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
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
