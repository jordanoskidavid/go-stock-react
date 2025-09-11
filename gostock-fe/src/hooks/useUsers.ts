import { useEffect, useState } from "react";
import type { User } from "../types/user.ts";
import { getUsers, updateUser, deleteUser } from "../services/user.ts";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});

    const fetchData = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setErrors({});
    };

    const handleSave = async () => {
        if (!editingUser) return;

        const newErrors: { name?: string; email?: string; role?: string } = {};

        if (!editingUser.name.trim()) newErrors.name = "Name is required";
        if (!editingUser.email.trim()) newErrors.email = "Email is required";
        if (!editingUser.role) newErrors.role = "Role is required";

        const duplicate = users.find(
            (u) => u.email === editingUser.email && u.id !== editingUser.id
        );
        if (duplicate) {
            newErrors.email = "This email is already in use";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateUser(editingUser.id, {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
            });

            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? response.data : u))
            );

            setEditingUser(null);
        } catch (err) {
            console.error("Failed to update user:", err);
        }
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
