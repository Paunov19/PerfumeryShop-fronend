import { useQuery } from "@tanstack/react-query";
import authHeader from "./auth-header";
import api from "./api";

export const GetAllPerfumesQuery = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["perfumes"],
        queryFn: async () =>
            await api.get("perfumes/all", {
                headers: authHeader()
            })
    });

    return { data: data?.data, isError, isLoading };
};

export const GetPerfumeByIdQuery = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["perfume", id],
        queryFn: async () => await api.get(`perfumes/${id}`)
    });

    return { data: data?.data, isError, isLoading };
};
