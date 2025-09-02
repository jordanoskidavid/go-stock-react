import {
    Avatar,
    Box,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    Container,
} from "@mui/material";
import SubmitButton from "../components/ui/submitButton.tsx";
import CustomTextField from "../components/ui/customTextField.tsx";
import { useUserProfile } from "../hooks/useUserProfile.ts";
import { useNavigate } from "react-router-dom"; // or next/router if using Next.js

const UserProfile = () => {
    const {
        editMode,
        setEditMode,
        email,
        role,
        setRole,
        setEmail,
        name,
        setName,
        handleSave,
    } = useUserProfile();

    const navigate = useNavigate(); // for react-router-dom navigation

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100dvh",
                p: 2,
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box sx={{ width: "90%", maxWidth: 900, textAlign: "left" }}>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/")} // navigate to home
                    sx={{ color: "#00AEEF" }}
                >
                    Go to Home
                </Button>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    width: "90%",
                    maxWidth: 900,
                    borderRadius: 3,
                    backgroundColor: "#002A41",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                }}
            >
                {/* Left side: Avatar + Info */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#002A41",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                        gap: 2,
                    }}
                >
                    <Avatar
                        src="/profilePicture.png"
                        alt="Avatar Picture"
                        sx={{ width: 120, height: 120 }}
                    />
                    {!editMode && (
                        <>
                            <Typography variant="h5" fontWeight="bold" color="#e3f2fd">
                                {name}
                            </Typography>
                            <Typography variant="body1" color="#e3f2fd">
                                {role}
                            </Typography>
                        </>
                    )}
                </Box>

                {/* Right side: Fields + Buttons */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        p: 4,
                        gap: 2,
                    }}
                >
                    {editMode ? (
                        <>
                            <CustomTextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <CustomTextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel
                                    sx={{
                                        color: "#e3f2fd",
                                        "&.Mui-focused": { color: "#e3f2fd" },
                                    }}
                                >
                                    Role
                                </InputLabel>
                                <Select
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e3f2fd" },
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#008DDA" },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#008DDA" },
                                        "& .MuiSelect-select": { color: "#e3f2fd" },
                                    }}
                                    value={role}
                                    label="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="employee">Employee</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" fontWeight="bold" color="#e3f2fd">
                                Email
                            </Typography>
                            <Typography variant="body1" color="#e3f2fd">
                                {email}
                            </Typography>
                        </>
                    )}

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        {editMode ? (
                            <>
                                <SubmitButton text="Save" onClick={handleSave} />
                                <Button
                                    variant="outlined"
                                    onClick={() => setEditMode(false)}
                                    sx={{
                                        color: "#e3f2fd",
                                        borderColor: "#008DDA",
                                        "&:hover": { borderColor: "#00AEEF", color: "#00AEEF" },
                                    }}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => setEditMode(true)}
                                    sx={{
                                        backgroundColor: "#008DDA",
                                        "&:hover": { backgroundColor: "#00AEEF" },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: "#e3f2fd",
                                        borderColor: "#008DDA",
                                        "&:hover": { borderColor: "#00AEEF", color: "#00AEEF" },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserProfile;
