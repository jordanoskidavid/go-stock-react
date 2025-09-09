import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            fullWidth
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e3f2fd" },
                    "&:hover fieldset": { borderColor: "#008DDA" },
                    "&.Mui-focused fieldset": { borderColor: "#008DDA" },
                },
                "& .MuiInputBase-input": { color: "#e3f2fd" },
                "& .MuiInputLabel-root": { color: "#e3f2fd" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
            }}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#e3f2fd" }}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default PasswordField;
