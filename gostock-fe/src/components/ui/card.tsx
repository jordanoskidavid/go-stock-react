import { Paper, Typography } from "@mui/material";

type CardProps = {
    title: string;
};

const Card = ({ title }: CardProps) => {
    return (
        <Paper
            elevation={10}
            sx={{
                borderRadius: 7,
                p: 10,
                textAlign: "center",
                width: 250,
                color: "#e3f2fd",
                backgroundColor: "#002A41",
                transition: "background-color 0.5s ease", // smooth transition
                "&:hover": {
                    backgroundColor: "#008DDA",
                },
                cursor: "pointer",
                mx: "auto",
            }}
        >
            {title && (
                <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    {title}
                </Typography>
            )}
        </Paper>
    );
};

export default Card;
