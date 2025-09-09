import {jwtDecode} from "jwt-decode";

export interface JwtPayload {
    user_id: number;
    email: string;
    role: string;
    exp: number;
}

export function getUserFromToken(token: string): JwtPayload | null {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
}
