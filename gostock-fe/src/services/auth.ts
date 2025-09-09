import { api } from "../config/api";
import { saveToken } from "../utils/storage";

export async function login(email: string, password: string) {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    saveToken(token);
    return token;
}
