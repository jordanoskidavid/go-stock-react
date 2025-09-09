// components/NonAuthenticatedRoute.tsx
import { Navigate } from "react-router-dom";
import {isLoggedIn} from "../../utils/storage.ts";
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

const NonAuthenticatedRoute = ({ children }: Props) => {
    if (isLoggedIn()) return <Navigate to="/" replace />;
    return children;
};

export default NonAuthenticatedRoute;
