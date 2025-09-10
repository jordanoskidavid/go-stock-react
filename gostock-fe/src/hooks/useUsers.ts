import {useEffect, useState} from "react";
import type {User} from "../types/user.ts";
import {getUsers} from "../services/user.ts";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        void fetchData();
    }, []);


    const handleDelete = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setErrors({});
    };

    const handleSave = () => {
        if (!editingUser) return;

        const newErrors: { name?: string; email?: string; role?: string } = {};
        if (!editingUser.name.trim()) newErrors.name = "Name is required";
        if (!editingUser.email.trim()) newErrors.email = "Email is required";
        if (!editingUser.role) newErrors.role = "Role is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
        setEditingUser(null);
    };

    return {
        users,
        editingUser,
        errors,
        setEditingUser,
        handleDelete,
        handleEdit,
        handleSave,
    };
};
