import { useState, useMemo } from "react";
import { Box, IconButton, Dialog, Button, TextField, MenuItem, Alert, Snackbar } from "@mui/material";
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
        errors,
        setEditingUser,
        handleDelete,
        handleEdit,
        handleSave,
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
                u.id.toString().includes(lowerSearch) ||
                u.name.toLowerCase().includes(lowerSearch) ||
                u.email.toLowerCase().includes(lowerSearch) ||
                u.role.toLowerCase().includes(lowerSearch)
        );
    }, [users, search]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <UsersHeader />

            <Box sx={{ flex: 1, p: 9 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb:2, mt:-5}}>
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
                                            <Delete sx={{ color: "grey", cursor: "not-allowed" }} />
                                        </IconButton>
                                    </>
                                ),
                        },
                    ]}
                />
            </Box>

            <Dialog
                open={!!editingUser}
                onClose={() => setEditingUser(null)}
                slotProps={{
                    paper: { sx: { backgroundColor: "transparent", boxShadow: "none" } },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            width: "100%",
                            maxWidth: 500,
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#002A41",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        <TextField
                            label="Name"
                            value={editingUser?.name || ""}
                            onChange={(e) =>
                                setEditingUser((prev) => prev && { ...prev, name: e.target.value })
                            }
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#e3f2fd" },
                                    "&:hover fieldset": { borderColor: "#00AEEF" },
                                    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
                                },
                                "& .MuiInputBase-input": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
                            }}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            value={editingUser?.email || ""}
                            onChange={(e) =>
                                setEditingUser((prev) => prev && { ...prev, email: e.target.value })
                            }
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#e3f2fd" },
                                    "&:hover fieldset": { borderColor: "#00AEEF" },
                                    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
                                },
                                "& .MuiInputBase-input": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
                            }}
                        />

                        <TextField
                            select
                            label="Role"
                            value={editingUser?.role || ""}
                            onChange={(e) =>
                                setEditingUser((prev) => prev && { ...prev, role: e.target.value as User["role"] })
                            }
                            error={!!errors.role}
                            helperText={errors.role}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#e3f2fd" },
                                    "&:hover fieldset": { borderColor: "#00AEEF" },
                                    "&.Mui-focused fieldset": { borderColor: "#00AEEF" },
                                },
                                "& .MuiInputBase-input": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root": { color: "#e3f2fd" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#e3f2fd" },
                            }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem
                                value="manager"
                                disabled={users.some(
                                    (u) => u.role === "manager" && u.id !== editingUser?.id
                                )}
                            >
                                Manager
                            </MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                        </TextField>


                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                            <Button
                                variant="outlined"
                                onClick={() => setEditingUser(null)}
                                sx={{
                                    color: "#e3f2fd",
                                    borderColor: "#e3f2fd",
                                    "&:hover": { borderColor: "#00AEEF", color: "#00AEEF" },
                                    borderRadius: 2,
                                    px: 3,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                sx={{
                                    backgroundColor: "#008DDA",
                                    "&:hover": { backgroundColor: "#00AEEF" },
                                    borderRadius: 2,
                                    px: 3,
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>

            {/* Snackbar */}
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
