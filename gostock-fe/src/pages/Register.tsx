import {
    Container,
    Paper,
    Typography,
    Alert,
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import {useRegister} from "../hooks/useRegister.ts";

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

                {/* Right side = form */}
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
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={name}
                            sx={{  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#e3f2fd",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                },
                                // 🔹 Change input text color
                                "& .MuiInputBase-input": {
                                    color: "#e3f2fd",
                                },
                                // 🔹 Change label color
                                "& .MuiInputLabel-root": {
                                    color: "#e3f2fd",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#e3f2fd",
                                },}}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            value={email}
                            sx={{  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#e3f2fd",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                },
                                // 🔹 Change input text color
                                "& .MuiInputBase-input": {
                                    color: "#e3f2fd",
                                },
                                // 🔹 Change label color
                                "& .MuiInputLabel-root": {
                                    color: "#e3f2fd",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#e3f2fd",
                                },}}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            sx={{  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#e3f2fd",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#008DDA",
                                    },
                                },
                                // 🔹 Change input text color
                                "& .MuiInputBase-input": {
                                    color: "#e3f2fd",
                                },
                                // 🔹 Change label color
                                "& .MuiInputLabel-root": {
                                    color: "#e3f2fd",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#e3f2fd",
                                },}}
                            onChange={(e) => setPassword(e.target.value)}
                        />

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

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 3,
                                fontSize: 20,
                                backgroundColor: "#008DDA",
                                color: "#e3f2fd",
                                fontWeight: "bold",
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
