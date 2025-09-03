import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const HeaderProfile = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                backgroundColor: "#002A41",
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{ width: "110px", height: "110px", cursor: "pointer" }}
                    />
                </Link>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h4" sx={{ color:"#e3f2fd"}}>
                   Your Profile
                </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{ width: "110px", height: "110px", cursor: "pointer" }}
                    />
                </Link>
            </Box>
        </Box>
    );
};

export default HeaderProfile;
