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
export const getOrdersReportByDate = async (from: string | Date, to: string | Date) => {
    const fromParam = from instanceof Date ? from.toISOString().split("T")[0] : from;
    const toParam = to instanceof Date ? to.toISOString().split("T")[0] : to;

    const response = await api.get(`/reports/stock/by-date-pdf?from=${fromParam}&to=${toParam}`, {
        responseType: "blob",
    });

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = ""; // backend controls filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};


