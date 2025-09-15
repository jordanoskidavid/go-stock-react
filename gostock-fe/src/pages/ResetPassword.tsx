import { Container, Paper, Typography, Alert, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import CustomTextField from "../components/ui/customTextField";
import SubmitButton from "../components/ui/submitButton";
import { useResetPassword } from "../hooks/useResetPassword";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    const {
        email,
        setEmail,
        code,
        setCode,
        new_password,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        success,
        handleSubmit,
    } = useResetPassword();

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
                <title>Reset Password | GoStock</title>
                <meta name="description" content="Reset your password with the code sent to your email." />
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
                        p: 4,
                        mt: { xs: -3, md: 0 },
                        color: "#e3f2fd",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Reset Password
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

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%", maxWidth: 400 }}>
                        <CustomTextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <CustomTextField
                            label="Reset Code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <CustomTextField
                            label="New Password"
                            type="password"
                            value={new_password}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <CustomTextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

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
                        <Box>
                            <SubmitButton text="Reset Password" />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
