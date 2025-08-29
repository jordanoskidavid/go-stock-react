import { useLogin } from "../hooks/useLogin.ts";
import {
    Container,
    Paper,
    Typography,
    Alert,
    Box,
    TextField,
    Button,
} from "@mui/material";

const Login = () => {
    const { email, password, setEmail, setPassword, error, handleSubmit } =
        useLogin();

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100dvh"
            }}
        >
            {/* Wrapper for left + right */}
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "80%",
                    maxWidth: "900px",
                }}
            >
                {/* Left side = logo */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        p: 4,
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
                <Box sx={{ flex: 1, p: 4, mt: { xs: -3, md: 0 },}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Log In
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
                            Login
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
