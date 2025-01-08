import fetchApi from "./apiInstance/api";

export const registerUser = async (formData) => {
  try {
    const endpoint = "auth/register";
    const response = await fetchApi(endpoint, "POST", formData);
    return response;
    
  } catch (error) {
    console.log("Could not register User, ", error);
  }
};
