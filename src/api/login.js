import { API_ROUTES } from "../utils/apiRoutes";
import axios from "./axios";

// Define API endpoint for login
const LOGIN = API_ROUTES.LOGIN;

export const login = async (formData) => {
    try {
        // Make the API call to login
        const response = await axios.post(
            LOGIN,
            {
                username: formData.username,
                password: formData.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Extract and return response data
        const data = await response.data;
        return data;
    } catch (error) {
        // Handle error
        throw error; // Re-throw the error to propagate it to the caller
    }
};
