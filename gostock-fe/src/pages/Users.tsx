import { Box, IconButton, Dialog, Button, TextField, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import FooterHome from "../components/pages/home/FooterHome";
import UsersHeader from "../components/pages/users/UsersHeader";
import DataTable from "../components/ui/dataTable";
import { useUsers, type User } from "../hooks/useUsers";

const Users = () => {
    const { users, editingUser, errors, setEditingUser, handleDelete, handleEdit, handleSave } = useUsers();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <UsersHeader />

            <Box sx={{ flex: 1, p: 3 }}>
                <DataTable
                    data={users}
                    columns={[
                        { id: "id", label: "ID" },
                        { id: "name", label: "Name" },
                        { id: "email", label: "Email" },
                        { id: "role", label: "Role" },
                        {
                            id: "actions",
                            label: "Actions",
                            align: "right",
                            render: (u: User) => (
                                <>
                                    <IconButton onClick={() => handleEdit(u)}>
                                        <Edit sx={{ color: "#00AEEF" }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(u.id)}>
                                        <Delete sx={{ color: "red" }} />
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
                    paper: {
                        sx: {
                            backgroundColor: "transparent", // transparent background
                            boxShadow: "none", // remove dialog shadow
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                >
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
                                setEditingUser(
                                    (prev) => prev && { ...prev, role: e.target.value as User["role"] }
                                )
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
                            <MenuItem value="manager">Manager</MenuItem>
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

            <FooterHome />
        </Box>
    );
};

export default Users;
