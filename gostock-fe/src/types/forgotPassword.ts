export interface ForgotPassword{
    email: string;
}
export interface ResetPasswordPayload {
    email: string;
    code: string;
    new_password: string;
}