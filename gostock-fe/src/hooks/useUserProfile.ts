import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearToken} from "../utils/storage.ts";

export const useUserProfile = () => {
    const [name, setName] = useState('David Jordanoski');
    const [email, setEmail] = useState('david@email.com');
    const [role, setRole] = useState('admin');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const handleSave = () =>{
        setEditMode(false);
    }
    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };
    return {
        name,
        setEditMode,
        setName,
        setEmail,
        setRole,
        role,
        editMode,
        email,
        handleSave,
        handleLogout
    }
}