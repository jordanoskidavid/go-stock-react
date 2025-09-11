import { TextField } from "@mui/material";
import React from "react";

type CustomTextFieldProps = {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

const CustomTextField = ({ label, value, onChange, type = "text" }: CustomTextFieldProps) => {
    return (
        <TextField
            fullWidth
            margin="normal"
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e3f2fd" },
                    "&:hover fieldset": { borderColor: "#008DDA" },
                    "&.Mui-focused fieldset": { borderColor: "#008DDA" },
                    // autofill styles
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px #002A41 inset",
                        WebkitTextFillColor: "#e3f2fd",
                        caretColor: "#e3f2fd",
                    },
                },
                "& .MuiInputBase-input": { color: "#e3f2fd" },
                "& .MuiInputLabel-root": { color: "#e3f2fd" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
            }}
        />
    );
};


export default CustomTextField;
