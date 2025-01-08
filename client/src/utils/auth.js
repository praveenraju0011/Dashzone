import Cookie from "js-cookie";

export const getToken = () => {
  return Cookie.get("jwtToken");
};

export const isAuthenticated = () => {
  const token = getToken();

  return !!token;
};
