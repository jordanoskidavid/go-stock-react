import React, {useState} from "react";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name && !email && !password && !role) {
            setError("All fields are required");
            return;
        }
        else{
            setError("Invalid inputs!");
        }
    }
    return { name, email, password, role, setName, handleSubmit, error,setEmail,setPassword,setRole };
    };