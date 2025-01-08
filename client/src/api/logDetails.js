import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";

export const logDetails = async (logObj) => {
  try {
    console.log(logDetails);
    const token = Cookie.get("jwtToken");
    const endpoint = "logDetails";
    const data = await fetchApi(endpoint, "POST", logObj, token);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Could not Delete the user, ", error);
  }
};
