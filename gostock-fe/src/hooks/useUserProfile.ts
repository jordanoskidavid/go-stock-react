import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/storage.ts";
import type { User } from "../types/user.ts";
import { getUserFromToken, type JwtPayload } from "../utils/jwt.ts";
import { getUserById, updateUser } from "../services/user.ts";

export const useUserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const navigate = useNavigate();

    const showToast = (message: string, severity: "success" | "error" = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) return;

            const payload: JwtPayload | null = getUserFromToken(token);
            const userId = payload?.user_id;
            if (!userId) return;

            try {
                const res = await getUserById(userId);
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                showToast("Failed to fetch user data", "error");
            } finally {
                setLoading(false);
            }
        };

        void fetchUser();
    }, []);

    const handleSave = async () => {
        if (!user) return;

        try {
            const res = await updateUser(user.id, { name: user.name, email: user.email, role: user.role });
            setUser(res.data);
            showToast("Profile updated successfully!", "success");
        } catch (err) {
            console.error("Failed to update user:", err);
            showToast("Failed to update profile", "error");
        } finally {
            setEditMode(false);
        }
    };

    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return {
        user,
        setUser,
        editMode,
        setEditMode,
        handleSave,
        handleLogout,
        loading,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    };
};
