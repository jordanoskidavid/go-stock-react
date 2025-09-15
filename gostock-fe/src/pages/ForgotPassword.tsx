import { Container, Paper, Typography, Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomTextField from "../components/ui/customTextField";
import SubmitButton from "../components/ui/submitButton";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPassword = () => {
    const { email, setEmail, error, success, handleSubmit } = useForgotPassword();

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
            <Helmet>
                <title>Forgot Password | GoStock</title>
                <meta name="description" content="Reset your password." />
            </Helmet>

            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "80%",
                    maxWidth: "900px",
                    backgroundColor: "#002A41",
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
                            marginBottom: { xs: "-10px", sm: "-40px", md: "-40px" },
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

                <Box sx={{ flex: 1, p: 4, mt: { xs: -3, md: 0 }, color: "#e3f2fd" }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Forgot Password
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, backgroundColor: "#e3f2fd", color: "#002A41" }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2, backgroundColor: "#e3f2fd", color: "#002A41" }}>
                            {success}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <CustomTextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <Box>
                            <SubmitButton text="Send Reset Link" />
                        </Box>

                        <Typography
                            component={Link}
                            to="/login"
                            sx={{
                                display: "block",
                                mt: 2,
                                textDecoration: "none",
                                fontSize: "20px",
                                color: "#008DDA",
                                "&:hover": {
                                    color: "#005f99",
                                    textDecoration: "none",
                                },
                            }}
                        >
                            Back to login
                        </Typography>


                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;
