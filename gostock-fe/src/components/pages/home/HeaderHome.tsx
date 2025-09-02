import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const HeaderHome = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                backgroundColor: "#002A41",
                py: 2,
            }}
        >
            {/* Left: Logo */}
            <Box sx={{ flexShrink: 0 }}>
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{ width: "110px", height: "110px", cursor: "pointer" }}
                    />
                </Link>
            </Box>

            {/* Middle: Hello David */}
            <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h3">
                    Hello David!
                </Typography>
            </Box>

            {/* Right: Profile Picture */}
            <Box sx={{ flexShrink: 0 }}>
                <Link to="/profile">
                    <img
                        src="/profilePicture.png"
                        alt="profile"
                        style={{ width: "68px", height: "60px", cursor: "pointer" }}
                    />
                </Link>
            </Box>
        </Box>
    );
};

export default HeaderHome;
