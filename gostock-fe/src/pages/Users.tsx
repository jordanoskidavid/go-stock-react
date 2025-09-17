import { useState, useMemo } from "react";
import { Box, IconButton, Dialog, TextField, Alert, Snackbar } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import FooterHome from "../components/pages/home/FooterHome";
import UsersHeader from "../components/pages/users/UsersHeader";
import DataTable from "../components/ui/dataTable";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user.ts";
import { useUserProfile } from "../hooks/useUserProfile.ts";

const Users = () => {
    const {
        users,
        editingUser,
        setEditingUser,
        handleDelete,
        handleEdit,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity,
    } = useUsers();
    const { user } = useUserProfile();

    const [search, setSearch] = useState("");

    // Filter users based on search
    const filteredUsers = useMemo(() => {
        if (!search) return users;
        const lowerSearch = search.toLowerCase();
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(lowerSearch) ||
                u.email.toLowerCase().includes(lowerSearch) ||
                u.role.toLowerCase().includes(lowerSearch) ||
                u.id.toString().includes(lowerSearch)
        );
    }, [users, search]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <UsersHeader />

            <Box sx={{ flex: 1, p: 4 }}>
                {/* Search input */}
                <Box sx={{ display: "flex", justifyContent: "center", mb:4}}>
                    <TextField
                        label="Search users"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <DataTable
                    data={filteredUsers}
                    columns={[
                        { id: "id", label: "ID" },
                        { id: "name", label: "Name" },
                        { id: "email", label: "Email" },
                        { id: "role", label: "Role" },
                        {
                            id: "actions",
                            label: "Actions",
                            align: "right",
                            render: (u: User) =>
                                user?.role === "admin" || user?.role === "manager" ? (
                                    <>
                                        <IconButton onClick={() => handleEdit(u)}>
                                            <Edit sx={{ color: "#00AEEF" }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(u.id)}>
                                            <Delete sx={{ color: "red" }} />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton
                                            disabled
                                            sx={{
                                                "&.Mui-disabled": {
                                                    cursor: "not-allowed !important",
                                                    pointerEvents: "auto",
                                                },
                                            }}
                                        >
                                            <Edit sx={{ color: "grey" }} />
                                        </IconButton>
                                        <IconButton
                                            disabled
                                            sx={{
                                                "&.Mui-disabled": {
                                                    cursor: "not-allowed !important",
                                                    pointerEvents: "auto",
                                                },
                                            }}
                                        >
                                            <Delete sx={{ color: "grey" }} />
                                        </IconButton>
                                    </>
                                ),
                        },
                    ]}
                />
            </Box>

            {/* Dialog and Snackbar remain unchanged */}
            <Dialog open={!!editingUser} onClose={() => setEditingUser(null)} slotProps={{ paper: { sx: { backgroundColor: "transparent", boxShadow: "none" } } }}>
                {/* Dialog content unchanged */}
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{
                        width: "100%",
                        fontWeight: "bold",
                        boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <FooterHome />
        </Box>
    );
};

export default Users;
