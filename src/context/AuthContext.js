/* eslint-disable */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { refresh } from "../api/token";
import { login } from "../api/login";
import { signup } from "../api/signup";

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const decodeTokens = async (tokens) => {

    if (!tokens.access) {
      console.log("Cant Auth");
      return;
    }
    setAuthToken({
      access: tokens.access,
      refresh: tokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    localStorage.setItem("user",JSON.stringify({
      username: jwtDecode(tokens?.access).username,
      phone_number: jwtDecode(tokens?.access).phone_number,
    }))
  };

  const loginUser = async (formData) => {
    try {
        const data = await login(formData);
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify({
            username: jwtDecode(data?.access).username,
            phone_number: jwtDecode(data?.access).phone_number,
        }));
        setAuthToken(data);
    } catch (error) {
        throw error;
    }
};



  const signupUser = async (formData) => {
    try {
      const data = await signup(formData);
      console.log(jwtDecode(data?.access).username, jwtDecode(data?.access).phone_number);
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify({
        username: jwtDecode(data?.access).username,
        phone_number: jwtDecode(data?.access).phone_number,
      }));
      setAuthToken(data);
      setUser({
        username: jwtDecode(data?.access).username,
        phone_number: jwtDecode(data?.access).phone_number,
      });
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(null);
  };

  const refreshTokens = async () => {
    authToken &&
      refresh(authToken?.refresh)
        .then((data) => {
          data = { access: data?.access, refresh: authToken?.refresh };
          localStorage.setItem("authTokens", JSON.stringify(data));
          setAuthToken(data);
        })
        .catch(() => {
          console.log("cant refresh token -> err");
          logoutUser();
        });

    if (loading) setLoading(false);
  };

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
    decodeTokens: decodeTokens,
    signupUser: signupUser,
  };

  useEffect(() => {

    if (loading) refreshTokens();

    let interval = setInterval(() => {
      if (authToken) {
        refreshTokens(authToken);
      }
    }, 360000);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
