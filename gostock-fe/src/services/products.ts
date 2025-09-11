import { api } from "../config/api";
import type {Product} from "../types/productsGet.ts";
import type {UpdateProductPayload} from "../types/productUpdate.ts";
import type {ProductAdd} from "../types/productAdd.ts";

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products/getAll");
    return response.data;
};
export const updateProduct = (id: number, product: Omit<UpdateProductPayload, "id">) => {
    return api.put(`/products/update-product/${id}`, product);
};
export const deleteProduct = (id: number) => {
    return api.delete(`/products/delete-product/${id}`);
};
export const addProduct = (product: ProductAdd) => {
    return api.post(`/products/create-product`, product);
}