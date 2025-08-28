import { Routes, Route } from "react-router-dom";
// import { Suspense } from "react";
import { routes } from "./config/routes";
import React from "react";
// import Loader from "./components/ui/Loader";
// import ErrorBoundary from "./components/ErrorBoundary";
// Define the type for each route

const Router: React.FC = () => {
    return (
        <Routes>
            {routes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
        </Routes>
    );
};

export default Router;