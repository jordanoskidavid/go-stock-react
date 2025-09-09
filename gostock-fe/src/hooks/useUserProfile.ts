import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearToken, getToken} from "../utils/storage.ts";
import type {User} from "../types/user.ts";
import {getUserFromToken, type JwtPayload} from "../utils/jwt.ts";
import {getUserById, updateUser} from "../services/user.ts";

export const useUserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        const payload: JwtPayload | null = getUserFromToken(token);
        if (!payload?.user_id) return;
        getUserById(payload.user_id)
            .then(res => setUser(res.data))
            .catch(err => console.error("Failed to fetch user:", err));
    }, []);

    const handleSave = () => {
        if (!user) return;

        updateUser(user.id, { name: user.name, email: user.email, role: user.role })
            .then(res => setUser(res.data))
            .catch(err => console.error("Failed to update user:", err))
            .finally(() => setEditMode(false));
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
    };
};
