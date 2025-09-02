import {
    Container,
    Paper,
    Typography,
    Alert,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import {useRegister} from "../hooks/useRegister.ts";
import SubmitButton from "../components/ui/submitButton.tsx";
import CustomTextField from "../components/ui/customTextField.tsx";

const Register = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        error,
        handleSubmit,
    } = useRegister();
    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100dvh",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "#002A41",
                    width: { xs: "90%", md: "80%" },
                    maxWidth: "900px",
                }}
            >
                {/* Left side = logo */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        p: 4,
                        color: "black",
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Logo"
                        sx={{
                            width: "100%",       // scale to parent width
                            maxWidth: "300px",   // never bigger than 300px
                            height: "auto",      // maintain aspect ratio
                            marginBottom: {xs: "-10px",sm:"-40px", md:"-40px"}
                        }}
                    />
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1.8rem", sm: "1.25rem", md: "1.5rem" },
                            color: "#e3f2fd",
                        }}
                    >
                        Simplify. Organize. Succeed
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, p: 4, mt: { xs: -3, md: 0 }, color:"#e3f2fd"}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2,backgroundColor:"#e3f2fd", color:"#002A41" }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <CustomTextField label={"Name"} value={name} onChange={(e) => setName(e.target.value)} />

                        <CustomTextField label={"Email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

                        <CustomTextField label={"Password"} type={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                        <FormControl fullWidth margin="normal">
                            <InputLabel   sx={{
                                color: "#e3f2fd",
                                "&.Mui-focused": {
                                    color: "#e3f2fd",
                                },
                            }}>Role</InputLabel>
                            <Select
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#e3f2fd",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#008DDA",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#008DDA",
                                    },

                                    // 🔹 Text color inside select
                                    "& .MuiSelect-select": {
                                        color: "#e3f2fd",
                                    },
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
                        <SubmitButton text={"Register"}/>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
