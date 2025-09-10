import { api } from "../config/api";
import type {Category} from "../types/categoriesGet.ts";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/category/get-all-categories");
    return response.data;
};