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
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "80%",
                    backgroundColor: "#002A41",
                    maxWidth: "900px",
                }}
            >

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
                            width: "100%",
                            maxWidth: "300px",
                            height: "auto",
                            marginBottom: {xs: "-10px",sm:"-40px", md:"-40px"}
                        }}
                    />

                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            color: "#e3f2fd",
                            fontSize: { xs: "1.8rem", sm: "1.25rem", md: "1.5rem" },
                          }}
                    >
                        Simplify. Organize. Succeed
                    </Typography>
                </Box>

                {/* Right side = form */}
                <Box sx={{ flex: 1, p: 4, mt: { xs: -3, md: 0 }, color:"#e3f2fd"}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Log In
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, backgroundColor:"#e3f2fd", color:"#002A41" }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            sx={{
                                "& .MuiOutlinedInput-root": {
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

                                "& .MuiInputBase-input": {
                                    color: "#e3f2fd",
                                },

                                "& .MuiInputLabel-root": {
                                    color: "#e3f2fd",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#e3f2fd",
                                },
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            sx={{
                                "& .MuiOutlinedInput-root": {
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
                                }, }}
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
                                color: "#e3f2fd",
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
