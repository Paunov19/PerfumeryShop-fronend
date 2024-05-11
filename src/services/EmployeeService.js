import { useMutation } from "@tanstack/react-query";
import api from "./api";
import authHeader from "./auth-header";

export const UpdateOrderStatus = (queryClient) => {
    return useMutation(
        async ({ orderId, newStatus }) => {
            const response = await api.put(
                `employee/orders/updateStatus`,
                { orderId, newStatus },
                {
                    headers: authHeader()
                }
            );
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log("Order status updated:", data);

                queryClient.invalidateQueries("userOrders");
            },
            onError: (error) => {
                console.error("Error updating order status:", error);
            }
        }
    );
};

export const ChangePerfumeAvailability = (queryClient) => {
    return useMutation(
        async (perfumeId) => {
            const response = await api.post(
                `employee/markPerfume/${perfumeId}`,
                null,
                {
                    headers: authHeader()
                }
            );
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log("Perfume availability changed:", data);

                queryClient.invalidateQueries("perfumes");
            },
            onError: (error) => {
                console.error("Error changing perfume availability:", error);
            }
        }
    );
};
