import { api } from "../config/api";
import type { Order } from "../types/orders.ts";

export const getOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
};
