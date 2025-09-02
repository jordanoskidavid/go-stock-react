import {useState} from "react";

export const useUserProfile = () => {
    const [name, setName] = useState('David Jordanoski');
    const [email, setEmail] = useState('david@email.com');
    const [role, setRole] = useState('admin');
    const [editMode, setEditMode] = useState(false);

    const handleSave = () =>{
        setEditMode(false);
    }
    return {
        name,
        setEditMode,
        setName,
        setEmail,
        setRole,
        role,
        editMode,
        email,
        handleSave
    }
}