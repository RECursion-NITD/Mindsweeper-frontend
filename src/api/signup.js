import { API_ROUTES } from "../utils/apiRoutes";
import axios from "./axios";

// define apis for signup
//const SIGNUP = API_ROUTES.SIGNUP
const SIGNUP = '/user/api/register/'
export const signup = async (formData) => {
    console.log('formdata',formData);
    const response = await axios.post(
      SIGNUP,
      {
        username:formData.username,
        password:formData.password,
        phone_number:formData.phone_number,
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