import { Navigate } from "react-router-dom";
import type {JSX} from "react";
import {isLoggedIn} from "../../utils/storage.ts";
interface Props {
    children: JSX.Element;
}

const AuthenticatedRoute = ({ children }: Props) => {
    if (!isLoggedIn()) return <Navigate to="/login" replace />;
    return children;
};

export default AuthenticatedRoute;
