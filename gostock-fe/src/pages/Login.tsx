import { useLogin } from "../hooks/useLogin.ts";
import SubmitButton from "../components/ui/submitButton";
import {
    Container,
    Paper,
    Typography,
    Alert,
    Box,
} from "@mui/material";
import CustomTextField from "../components/ui/customTextField.tsx";

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
                        <CustomTextField label={"Email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

                        <CustomTextField label={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                        <SubmitButton text={"Login"}/>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
