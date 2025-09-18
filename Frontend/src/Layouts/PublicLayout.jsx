import { Outlet } from "react-router-dom";
import { userAuthstore } from "@/Store/authStore.js";
import { Navigate } from "react-router-dom";

export const PublicLayout = () => {
  const { user } = userAuthstore();
  if (user) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
