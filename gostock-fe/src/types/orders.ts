export interface OrderProduct {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        category_id: number;
        created_at: string;
        updated_at: string;
    };
}

export interface Order {
    id: number;
    user_id: number;
    status: string;
    total: number;
    created_at: string;
    updated_at: string;
    products: OrderProduct[];
}


export interface OrderProductInput {
    product_id: number;
    quantity: number;
}

export interface CreateOrderPayload {
    user_id: number;
    products: OrderProductInput[];
}
export type UpdateOrderStatusPayload = {
    status: "pending" | "shipped" | "delivered";
};
