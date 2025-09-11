import { api } from "../config/api";
import type {Product} from "../types/productsGet.ts";

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products/getAll");
    return response.data;
};
export const updateProduct = (id: number, product: Omit<Product, "id">) => {
    return api.put(`/products/update-product/${id}`, product);
};
export const deleteProduct = (id: number) => {
    return api.delete(`/products/delete-product/${id}`);
};