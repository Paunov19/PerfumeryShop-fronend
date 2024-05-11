import axios from "axios";
import authHeader from "./auth-header";

const getBaseURL = () => {
    return "http://localhost:8080/api/v1";
};

const API_URL = `${getBaseURL()}/auth/`;

class AuthService {
    async loginUser(email, password) {
        try {
            const response = await axios.post(API_URL + "signin", {
                email,
                password
            });
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            console.log(response.data);

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    register(email, firstName, lastName, password) {
        return axios.post(API_URL + "signup", {
            email,
            firstName,
            lastName,
            password
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    async updateProfile(userId, updatedUser) {
        const response = await axios.put(
            API_URL + `updateProfile/${userId}`,
            updatedUser,
            {
                headers: authHeader()
            }
        );

        return response.data;
    }
}

export default new AuthService();
