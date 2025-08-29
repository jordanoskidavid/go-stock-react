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
                        }}
                    >
                        Simplify. Organize. Succeed
                    </Typography>
                </Box>

                {/* Right side = form */}
                <Box sx={{ flex: 1, p: 4, mt: { xs: -3, md: 0 }}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
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
                                color: "#F7EEDD",
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
