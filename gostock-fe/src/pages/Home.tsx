import { Box, Typography } from "@mui/material";
import HeaderHome from "../components/pages/home/HeaderHome.tsx";
import FooterHome from "../components/pages/home/FooterHome";
import Card from "../components/ui/card.tsx";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <HeaderHome />

            <Box
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 4,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontSize: "25px", mt: 5, mb: 10 }}
                >
                    Here’s an overview of your dashboard. Click a card to manage each section.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center", // center cards horizontally
                        flexWrap: "wrap",
                        gap: 4,
                    }}
                >
                    <Link to={'/categories'} style={{ textDecoration: "none" }}>
                        <Card title="CATEGORIES" />
                    </Link>
                    <Link to={'/users'} style={{ textDecoration: "none" }}>
                    <Card title="USERS" />
                    </Link>
                    <Link to={'/products'} style={{ textDecoration: "none" }}>
                    <Card title="PRODUCTS" />
                    </Link>
                    <Card title="ORDERS" />
                </Box>
            </Box>

            <FooterHome />
        </Box>
    );
};

export default Home;
