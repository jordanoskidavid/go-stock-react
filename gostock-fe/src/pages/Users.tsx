import {Box} from "@mui/material";

import FooterHome from "../components/pages/home/FooterHome.tsx";
import UsersHeader from "../components/pages/users/UsersHeader.tsx";

const Users = () => {
    return(
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <UsersHeader />

        <p>USERS PAGE</p>

        <FooterHome />
    </Box>);
}
export default Users;