import { API_ROUTES } from "../utils/apiRoutes";
import axios from "./axios";

// define apis for login
const LOGIN = API_ROUTES.LOGIN
export const login = async (formData) => {
    console.log('formdata',formData);
    const response = await axios.post(
      LOGIN,
      {
        username:formData.username,
        password:formData.password,
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
  };
  