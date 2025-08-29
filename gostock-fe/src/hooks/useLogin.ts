import React, {useState } from "react";
export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }
        if (email === 'test@example.com' && password === '123456') {
            setError(null);
            alert('Logged in successfully!');
        }
        else {
            setError('Invalid email or password!');
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