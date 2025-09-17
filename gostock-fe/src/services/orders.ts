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
