export function saveToken(token: string) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function clearToken() {
    localStorage.removeItem("token");
}
export const isLoggedIn = () => {
    const token = getToken();
    return !!token; // true if token exists
};