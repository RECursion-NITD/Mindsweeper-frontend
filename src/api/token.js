// define apis for login
import { API_ROUTES } from "../utils/apiRoutes"
import axios from "./axios"

export const refresh = async (formData) => {
    const response = await axios.post(
      API_ROUTES.TOKEN,
      {
        refresh:formData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.data;
    return data;
}
  