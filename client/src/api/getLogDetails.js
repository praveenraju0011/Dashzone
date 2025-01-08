import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";

export const getLogDetails = async () => {
  try {
    const token = Cookie.get("jwtToken");
    const endpoint = "logDetails/user";
    const data = await fetchApi(endpoint, "GET", null, token);

    return data;
  } catch (error) {
    console.log("Could not Delete the user, ", error);
  }
};
