import { api } from "../config/api";
import type {User} from "../types/user.ts";
export const getUserById = (id: number) => {
    return api.get(`/get-user-by-id/${id}`);
};
export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/get-all-users");
    return response.data;
};
export const updateUser = (id: number, data: Partial<User>) => {
    return api.put(`/update-user-by-id/${id}`, data);
};
export const deleteUser = (id: number) => {
    return api.delete(`/delete-user-by-id/${id}`);
};