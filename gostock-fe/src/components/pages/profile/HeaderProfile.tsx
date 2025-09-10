import { Link } from "react-router-dom";
import {Typography, Box, Button} from "@mui/material";
import {useUserProfile} from "../../../hooks/useUserProfile.ts";

const HeaderProfile = () => {
    const {user} = useUserProfile();
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
                        Register
                    </Button>                </Link>
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
        </Box>
    );
};

export default HeaderProfile;
