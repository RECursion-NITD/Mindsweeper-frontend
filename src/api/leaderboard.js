import { API_ROUTES } from "../utils/apiRoutes";
import axios from "./axios";

// define APIs for signup
const LEADERBOARD = API_ROUTES.LEADERBOARD;

export const ranking = async () => {
    try {
        const response = await axios.post(
            LEADERBOARD,
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
