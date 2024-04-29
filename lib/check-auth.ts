import Cookie from "js-cookie";

export const checkAuth = () => {
  const token = Cookie.get("admin-token");
  return !!token;
};
