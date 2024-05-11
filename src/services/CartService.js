import api from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authHeader from "./auth-header";

export const AddToCart = (cartItem) => {
    return useMutation(async () => {
        return await api.post("perfumes/addToCart", cartItem, {
            headers: authHeader()
        });
    });
};

export const GetAllProductsByIds = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: async () =>
            await api.get("perfumes/checkout", {
                headers: authHeader()
            }),
        staleTime: 0,
        cacheTime: 0
    });

    return { data: data?.data, isError, isLoading };
};

export const useUpdateCartItemQuantityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ cartItemId, newCartItem }) => {
            const response = await api.put(
                `perfumes/cart/cartItem/${cartItemId}`,
                newCartItem,
                {
                    headers: authHeader()
                }
            );

            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["cart"]);
            }
        }
    );
};

export const removeFromCart = async (productId, queryClient) => {
    const response = await api.delete(`perfumes/removeItem/${productId}`, {
        headers: authHeader()
    });

    queryClient.invalidateQueries(["cart"]);

    return response.data;
};
