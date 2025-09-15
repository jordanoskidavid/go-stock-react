import React, { useState } from "react";
import type { ForgotPassword } from "../types/forgotPassword.ts";
import {ResetLink} from "../services/password.ts";

export const useForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        try {
            const payload: ForgotPassword = { email };
            await ResetLink(payload);
            setSuccess("Password reset code has been sent to your email.");
            setEmail("");
        } catch  {
            setError("Something went wrong.");
        }
    };

    return {
        email,
        setEmail,
        error,
        success,
        handleSubmit,
    };
};
