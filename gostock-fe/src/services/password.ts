import {api} from "../config/api.ts";
import type {ForgotPassword, ResetPasswordPayload} from "../types/forgotPassword.ts";

export const ResetLink = (forgotPassword: ForgotPassword) => {
    return api.post(`/forgot-password`, forgotPassword);
}
export const ResetPassword = (payload: ResetPasswordPayload) => {
    return api.post("/reset-password", payload);
};

export const triggerStockWarning = () => {
    return api.post("/products/low-stock-notify"); // adjust path if your backend uses another one
};
