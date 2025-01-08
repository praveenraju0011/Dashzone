import Cookie from "js-cookie";
import fetchApi from "./apiInstance/api";
export const fetchDashboardData = async () => {
  try {
    const token = Cookie.get("jwtToken");
    const endpoint = "dashboard";
    const response = await fetchApi(endpoint, "GET", null, token);
    return response;
  } catch (error) {
    console.log("Could not fetch data, ", error);
  }
};
