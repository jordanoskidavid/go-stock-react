import { Link } from "react-router-dom";
import {Typography, Box, Button, Snackbar, Alert} from "@mui/material";
import {useUserProfile} from "../../../hooks/useUserProfile.ts";

const HeaderProfile = () => {
    const {user,handleStockWarning,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        snackbarSeverity} = useUserProfile();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py:2,
                backgroundColor: "#002A41",
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <Link to="/">
                    <img
                        src="src/assets/backArrow.png"
                        alt="logo"
                        style={{ width: "60px", height: "60px", cursor: "pointer" }}
                    />
                </Link>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h4" sx={{ color:"#e3f2fd"}}>
                   Your Profile
                </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
                {user?.role === 'admin' ? (
                    <>
                        <Button
                            variant="contained"
                            onClick={handleStockWarning}
                            sx={{
                                backgroundColor: "#008DDA",
                                "&:hover": { backgroundColor: "#00AEEF" },
                                borderRadius: 2,
                                px: 1,
                            }}
                        >
                            Stock warning
                        </Button>
                <Link to="/register">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#008DDA",
                            "&:hover": { backgroundColor: "#00AEEF" },
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Add a User
                    </Button>                </Link>

                    </>
                    ):(
                    <Link to="/">
                        <img
                            src="/logo.png"
                            alt="logo"
                            style={{ width: "110px", height: "110px", cursor: "pointer" }}
                        />
                    </Link>
                )}
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%", fontWeight: "bold", boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                    }}                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default HeaderProfile;
