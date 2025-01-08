import Cookie from "js-cookie";
import CryptoJS from "crypto-js";

const baseUrl = import.meta.env.VITE_BASE_URL;
const secretKey = import.meta.env.VITE_SECRET_KEY;

const encryptPayload = (payload) => {
  return CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
};

const fetchApi = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOption = {
    method,
    headers,
  };

  if (body) {
    // requestOption.body = JSON.stringify(body);
    const encryptedBody = encryptPayload(body);
    requestOption.body = JSON.stringify({ data: encryptedBody });
    console.log(encryptedBody);
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, requestOption);

    const data = await response.json();

    if (response.status === 401 && data.message === "Invalid token") {
      console.log(response.status, " ", data.message);
      console.log("Cookie expired, removing the cookie");
      alert("Token Expired, Please login again");
      Cookie.remove("jwtToken");
      window.location.href = "/login";
    }
    if (!response.ok) {
      throw new Error(data.message || "Internal Server Error");
    }
    return data;
  } catch (error) {
    console.log("Could not Fetch from api instance", error);
    return { error: error.message || "Failed to fetch" };
  }
};

export default fetchApi;
