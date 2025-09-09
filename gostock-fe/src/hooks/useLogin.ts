import React, {useState } from "react";
import { login } from "../services/auth";
import {useNavigate} from "react-router-dom";
export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }
        try {
            setError(null);

            await login(email, password);

            navigate("/");
        } catch {
            setError("Invalid email or password!");
        }
    }
    return {
        email,
        password,
        error,
        setPassword,
        setEmail,
        handleSubmit
    };
}