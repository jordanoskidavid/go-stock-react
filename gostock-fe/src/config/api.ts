import axios from "axios";
import { getToken } from "../utils/storage";

export const api = axios.create({
    baseURL: "http://localhost:8080/api", // your Go backend base URL
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
