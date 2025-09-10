import React, { useState } from "react";
import { registerUser } from "../services/auth";
import type {RegisterUser} from "../types/registerUser.ts";
import {useNavigate} from "react-router-dom";

export const useRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"employee" | "admin" | "manager">("employee");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !role) {
            setError("All fields are required");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const newUser: RegisterUser = { name, email, password, role };

            await registerUser(newUser);
            navigate("/profile");
            setSuccess(true);
        } catch {
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        email,
        password,
        role,
        setName,
        setEmail,
        setPassword,
        setRole,
        handleSubmit,
        error,
        loading,
        success,
    };
};
