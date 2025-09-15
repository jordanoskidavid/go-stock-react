import {api} from "../config/api.ts";
import type {ForgotPassword} from "../types/forgotPassword.ts";

export const ResetLink = (forgotPassword: ForgotPassword) => {
    return api.post(`/forgot-password`, forgotPassword);
}