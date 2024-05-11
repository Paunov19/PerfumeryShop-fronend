import axios from "axios";
import AuthService from "./AuthService";

const BASE_URL = "http://localhost:8080/api/v1/";

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                AuthService.logout();
                window.location.href = "/signin";
            } else if (status === 403) {
                window.location.href = "/forbidden";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
