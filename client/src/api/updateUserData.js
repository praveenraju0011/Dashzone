import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";
export const updateUserData = async (id, updatedData) => {
  try {
    const token = Cookie.get("jwtToken");
    const endpoint = `dashboard/${id}`;
    const response = await fetchApi(endpoint, "PUT", updatedData, token);
    return response;
  } catch (error) {
    console.log("Could not update the user Details, ", error);
  }
};
