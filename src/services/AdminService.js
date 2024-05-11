import { useMutation, useQueryClient } from "@tanstack/react-query";
import authHeader from "./auth-header";
import { useQuery } from "@tanstack/react-query";
import api from "./api";

const addEmployee = (employee) => {
    return api.post("admin/addEmployee", employee, {
        headers: authHeader()
    });
};

export function useAddEmployeeMutation() {
    return useMutation(addEmployee);
}

const getAllEmployees = async () => {
    const response = await api.get("admin/getAllEmployees", {
        headers: authHeader()
    });

    return response.data;
};

export function useAllEmployeesQuery() {
    return useQuery(["allEmployees"], getAllEmployees);
}

const deleteEmployee = async (employeeId) => {
    const response = await api.delete(`admin/deleteEmployee/${employeeId}`, {
        headers: authHeader()
    });
    return response.data;
};

export function useDeleteEmployeeMutation() {
    const queryClient = useQueryClient();

    return useMutation(deleteEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("allEmployees");
        }
    });
}

const changeEmployeeRole = (requestData) => {
    return api.post("admin/changeUserRole", requestData, {
        headers: authHeader()
    });
};

export function useChangeEmployeeRole() {
    const queryClient = useQueryClient();

    return useMutation(changeEmployeeRole, {
        onSuccess: () => {
            queryClient.invalidateQueries("allEmployees");
        }
    });
}
