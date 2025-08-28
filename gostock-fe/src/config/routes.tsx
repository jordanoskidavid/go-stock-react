import * as React from "react";
import {Home} from "../pages/Home.tsx";
import { About } from "../pages/About";

export interface RouteType {
    path: string;
    element: React.ComponentType;
}

export const routes: RouteType[] = [
    { path: "/", element: Home },
    { path: "/about", element: About },
    // Add more routes here
];

