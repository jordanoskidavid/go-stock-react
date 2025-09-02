import {Box,Typography,Link} from "@mui/material";

const FooterHome = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                py:2,
                mt:2,
                backgroundColor: "#002A41",
            }}
        >
            <Box  sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}>
                <Link href="https://github.com/jordanoskidavid" target="_blank">
                    <img src="/github.png" alt="GitHub" style={{ width: 30, height: 30 }} />
                </Link>
                <Typography variant="body2" sx={{ color: "#e3f2fd", fontSize:"20px" }}>
                    © {new Date().getFullYear()} David Jordanoski
                </Typography>
                <Link href="https://www.linkedin.com/in/david-jordanoski-39047023a/" target="_blank">
                    <img src="/linkedin.png" alt="LinkedIn" style={{ width: 30, height: 30 }} />
                </Link>
            </Box>

        </Box>
    );
};

export default FooterHome;
