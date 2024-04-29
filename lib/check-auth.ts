import Cookie from "js-cookie";

export const checkAuth = () => {
  const token = Cookie.get("token");
  return !!token;
};
