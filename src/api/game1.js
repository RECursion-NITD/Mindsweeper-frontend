import { API_ROUTES } from "../utils/apiRoutes"
import axios from "./axios"

const CREATE = API_ROUTES.CREATE_GAME1;
const VALIDATE = API_ROUTES.VALIDATE;

export const createGame = async (access,phn) => {
    const response = await axios.post(
        CREATE, 
        { phone : phn},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`,
        },
    });
    const data = await response.data;
    return data;
  }

 export const validate = async (input, phn, access) => {
    const response = await axios.post(
        VALIDATE, 
        { phone : phn, input: input},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`,
            },
        }
    );
  
    const data = await response.data;
    return data;
  }

  export const fetchGame1 = async (access,phn) => {
    const response = await axios.post(
        API_ROUTES.FETCH_GAME1,
        {phone : phn},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`,
            },
        }
    );
    const data = await response.data;
    return data;
  }