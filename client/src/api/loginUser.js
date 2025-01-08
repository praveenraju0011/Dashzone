import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";
const loginUser = async (credentials) => {
  try {
    const endpoint = "auth/login";
    const response = await fetchApi(endpoint, "POST", credentials);

    if (response.error) {
      throw new Error(response.error);
    }

    if (response) {
      Cookie.set("jwtToken", response.token);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default loginUser;
