import {Routes, Route, Navigate} from "react-router-dom";
// import { Suspense } from "react";
import { routes } from "./config/routes";
import React from "react";
import NonAuthenticatedRoute from "./components/authroutes/NonAuthenticatedRoute.tsx";
import AuthenticatedRoute from "./components/authroutes/AuthenticatedRoute.tsx";
import {isLoggedIn} from "./utils/storage.ts";
// import Loader from "./components/ui/Loader";
// import ErrorBoundary from "./components/ErrorBoundary";
// Define the type for each route

const Router: React.FC = () => {
    return (
        <Routes>
            {routes.map(({ path, element: Element }) => {
                // Pages for guests only
                if (path === "/login") {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <NonAuthenticatedRoute>
                                    <Element />
                                </NonAuthenticatedRoute>
                            }
                        />
                    );
                }

                // Pages for authenticated users only
                return (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <AuthenticatedRoute>
                                <Element />
                            </AuthenticatedRoute>
                        }
                    />
                );
            })}

            <Route path="*" element={<Navigate to={isLoggedIn() ? "/" : "/login"} />} />
        </Routes>
    );
};

export default Router;