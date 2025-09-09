import { useState } from "react";
import type {User} from "../types/user.ts";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "manager" },
        { id: 3, name: "David Johnson", email: "david@example.com", role: "employee" },
    ]);

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});

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
