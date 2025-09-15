import React, { useState } from "react";
import type { ResetPasswordPayload } from "../types/forgotPassword.ts";
import {ResetPassword} from "../services/password.ts";
import {useNavigate} from "react-router-dom";

export const useResetPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!code || !new_password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (new_password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const payload: ResetPasswordPayload = { email,code, new_password };
            await ResetPassword(payload);
            setSuccess("Your password has been reset successfully.");
            setCode("");
            setNewPassword("")
            setConfirmPassword("");
            setEmail("");
            setTimeout(() => (navigate('/login')), 1000);
        } catch {
            setError("Something went wrong.");
        }
    };

    return {
        code,
        setCode,
        new_password,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        email,
        setEmail,
        error,
        success,
        handleSubmit,
    };
};
