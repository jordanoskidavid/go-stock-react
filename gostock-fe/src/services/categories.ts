import { api } from "../config/api";
import type {Category} from "../types/categoriesGet.ts";
import type {CategoryAdd} from "../types/categoriesAdd.ts";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/category/get-all-categories");
    return response.data;
};
export const addCategories = (category : CategoryAdd) => {
    return api.post(`/category/create-category`, category);
}
export const updateCategory = (id: number, category: CategoryAdd) => {
    return api.put<Category>(`/category/update-category/${id}`, category);
};
export const deleteCategory = (id: number) => {
    return api.delete(`/category/delete-category/${id}`);
};