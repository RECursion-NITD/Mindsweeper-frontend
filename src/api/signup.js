import { API_ROUTES } from "../utils/apiRoutes";
import axios from "./axios";

// define APIs for signup
// const SIGNUP = API_ROUTES.SIGNUP;
const SIGNUP = '/user/api/register/';

export const signup = async (formData) => {
    try {
        const response = await axios.post(
            SIGNUP,
            {
                username: formData.username,
                password: formData.password,
                phone_number: formData.phone_number,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.data;
        console.log("data", data);
        return data;
    } catch (error) {
        // Handle error
        //console.error("Error occurred during signup:", error.response.data);
        throw error; // Re-throw the error to propagate it to the caller
    }
};
