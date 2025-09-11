import { useEffect, useState } from "react";
import type { User } from "../types/user.ts";
import { getUsers, updateUser, deleteUser } from "../services/user.ts";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const fetchData = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch {
            showSnackbar("Failed to fetch users", "error");
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            showSnackbar("User deleted successfully", "success");
        } catch {
            showSnackbar("Failed to delete user", "error");
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
            showSnackbar("Please fix the errors before saving", "error");
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
            showSnackbar("User updated successfully", "success");
        } catch {
            showSnackbar("Failed to update user", "error");
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
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    };
};
