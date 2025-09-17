import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import type { UpdateOrderStatusPayload } from "../../../types/orders.ts";

interface Props {
    open: boolean;
    orderId: number;
    onClose: () => void;
    onUpdate: (id: number, payload: UpdateOrderStatusPayload) => void;
}

export default function UpdateStatusDialog({ open, orderId, onClose, onUpdate }: Props) {
    const [status, setStatus] = useState<UpdateOrderStatusPayload["status"]>("pending");

    const handleSubmit = () => {
        onUpdate(orderId, { status });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle
                sx={{
                    backgroundColor: "#002A41",
                    color: "#e3f2fd",
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                Update Order Status
            </DialogTitle>

            <DialogContent sx={{ backgroundColor: "#002A41", p: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3,mt:1, width: "100%" }}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: "#e3f2fd" }}>Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as UpdateOrderStatusPayload["status"])}
                            label="Status"
                            sx={{
                                color: "#e3f2fd",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e3f2fd" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#00AEEF" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00AEEF" },
                            }}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions sx={{ backgroundColor: "#002A41", p: 3, display: "flex", gap: 2 }}>
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
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
