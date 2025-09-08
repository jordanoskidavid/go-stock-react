import * as React from "react";
import Home from "../pages/Home.tsx";
import UserProfile from "../pages/UserProfile.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Users from "../pages/Users.tsx";
import Categories from "../pages/Categories.tsx";
import Products from "../pages/Products.tsx";

export interface RouteType {
    path: string;
    element: React.ComponentType;
}

export const routes: RouteType[] = [
    { path: "/", element: Home },
    { path: "/profile", element: UserProfile },
    { path: "/login", element: Login},
    { path: "/register", element: Register},
    { path: "/users", element: Users},
    { path: "/categories", element: Categories},
    { path: "/products", element:Products}

];

