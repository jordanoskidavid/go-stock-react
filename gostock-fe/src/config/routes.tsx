import * as React from "react";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Users from "../pages/Users.tsx";

export interface RouteType {
    path: string;
    element: React.ComponentType;
}

export const routes: RouteType[] = [
    { path: "/", element: Home },//dashboard
    { path: "/about", element: About },
    { path: "/login", element: Login},
    { path: "/register", element: Register},
    { path: "/users", element: Users},
];

