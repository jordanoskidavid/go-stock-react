export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "manager" | "employee";
}
