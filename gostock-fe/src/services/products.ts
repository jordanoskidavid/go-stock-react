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
export const getRemainingStockReport = async () => {
    const response = await api.get("/reports/remaining-stock", { responseType: "blob" });

    const contentDisposition =
        response.headers["content-disposition"] || response.headers["Content-Disposition"];
    let fileName = "remaining_stock_report.pdf";
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) fileName = match[1];
    }

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};