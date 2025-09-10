import { api } from "../config/api";
import { saveToken } from "../utils/storage";
import type {RegisterUser} from "../types/registerUser.ts";

export async function login(email: string, password: string) {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    saveToken(token);
    return token;
}
export const registerUser = (user: RegisterUser) => {
    return api.post(`/register`, user);
}