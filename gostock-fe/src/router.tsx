import {Routes, Route, Navigate} from "react-router-dom";
import { routes } from "./config/routes";
import React from "react";
import NonAuthenticatedRoute from "./components/authroutes/NonAuthenticatedRoute.tsx";
import AuthenticatedRoute from "./components/authroutes/AuthenticatedRoute.tsx";
import {isLoggedIn} from "./utils/storage.ts";


const Router: React.FC = () => {
    return (
        <Routes>
            {routes.map(({ path, element: Element }) => {
                if (path === "/login" || path === "/forgot-password" || path === "/reset-password") {
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