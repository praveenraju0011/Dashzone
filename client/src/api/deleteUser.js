import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";

export const deleteUserData = async (id) => {
  try {
    const token = Cookie.get("jwtToken");
    const endpoint = `dashboard/delete/${id}`;
    const data = await fetchApi(endpoint, "DELETE", null, token);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Could not Delete the user, ", error);
  }
};
