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
import HeaderProfile from "../components/pages/profile/HeaderProfile.tsx";
import FooterHome from "../components/pages/home/FooterHome.tsx";
import { Helmet } from "react-helmet-async";

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
        handleLogout
    } = useUserProfile();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
                backgroundColor: "#001E2B",
            }}
        >
            <Helmet>
                <title>Your Profile | GoStock</title>
                <meta name="description" content="Manage your GoStock profile settings here." />
            </Helmet>
            <HeaderProfile />

            <Container
                maxWidth={false}
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "90%",
                        maxWidth: 900,
                        borderRadius: 3,
                        backgroundColor: "#002A41",
                        display: "flex",
                        p: 2,
                        flexDirection: { xs: "column", md: "row" },
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                            gap: 1,
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
                                <Typography variant="h5" color="#e3f2fd">
                                    {role}
                                </Typography>
                            </>
                        )}
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            p: 4,
                            gap: 1,
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
                                <Typography variant="h4" fontWeight="bold" color="#e3f2fd">
                                    Email
                                </Typography>
                                <Typography variant="h5" color="#e3f2fd">
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
                                            mt: 3,
                                            fontSize: 20,
                                            pl: 5,
                                            pr: 5,
                                            borderColor: "#008DDA",
                                            color: "#e3f2fd",
                                            fontWeight: "bold",
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
                                            mt: 3,
                                            fontSize: 18,
                                            backgroundColor: "#008DDA",
                                            color: "#e3f2fd",
                                            "&:hover": { backgroundColor: "#00AEEF" },
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        type={"submit"}
                                        onClick={handleLogout}
                                        sx={{
                                            mt: 3,
                                            fontSize: 18,
                                            borderColor: "#008DDA",
                                            color: "#e3f2fd",
                                            "&:hover": { borderColor: "#008DDA", color: "#008DDA" },
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

            <FooterHome />
        </Box>
    );
};

export default UserProfile;
