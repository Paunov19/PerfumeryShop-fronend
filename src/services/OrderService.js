import { useMutation, useQuery } from "@tanstack/react-query";
import authHeader from "./auth-header";
import api from "./api";

export const CreateOrder = (queryClient) => {
    return useMutation(
        async (orderData) => {
            const response = await api.post(
                "perfumes/checkout/createOrder",
                orderData,
                {
                    headers: authHeader()
                }
            );
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log("Order created:", data);

                queryClient.invalidateQueries("cart");
            },
            onError: (error) => {
                console.error("Error creating order:", error);
            }
        }
    );
};

export const GetUserOrders = () => {
    return useQuery(["orders"], async () => {
        const response = await api.get("perfumes/checkout/orders", {
            headers: authHeader()
        });
        return response.data;
    });
};

export const GetOrderById = (orderId) => {
    return useQuery(["order", orderId], async () => {
        const response = await api.get(`perfumes/orders/${orderId}`, {
            headers: authHeader()
        });
        return response.data;
    });
};

export const GetAllUserOrders = () => {
    return useQuery(["userOrders"], async () => {
        const response = await api.get("perfumes/checkout/orders/all", {
            headers: authHeader()
        });
        return response.data;
    });
};
