import { api } from "../config/api";
import type {CreateOrderPayload, Order, UpdateOrderStatusPayload} from "../types/orders.ts";


export const getOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    const response = await api.post<Order>("/orders/create", payload);
    return response.data;
};

export const updateOrder = async (id: number, payload: UpdateOrderStatusPayload): Promise<Order> => {
    const response = await api.put<Order>(`/orders/status/${id}`, payload);
    return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
    await api.delete(`/orders/delete/${id}`);
};
// export const getOrdersReport = async (): Promise<void> => {
//     const response = await api.get("/orders/excel", {
//         responseType: "blob", // makes sure the file is downloaded correctly
//     });
//
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "orders_report.xlsx"); // adjust extension if needed
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
// };
export const getOrdersReport = async (): Promise<void> => {
    const response = await api.get("/orders/excel", {
        responseType: "blob",
    });

    const contentDisposition = response.headers["content-disposition"] || response.headers["Content-Disposition"];
    let fileName = "orders_report.xlsx"; // fallback

    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
            fileName = match[1];
        }
    }

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Release memory
    window.URL.revokeObjectURL(url);
};


