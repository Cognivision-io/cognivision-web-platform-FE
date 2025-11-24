import React, { useEffect } from "react";
import {
  Routes as AppRoutes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Index from "../pages/Index";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import { useAuth } from "@/contexts/AuthContext";
import ForgetPassword from "@/pages/ForgetPassword";

export default function Routes() {
  const { isAuthenticated, token, user } = useAuth();
  console.log("🚀 ~ Routes ~ token:", token);
  console.log("🚀 ~ Routes ~ user:", user);
  console.log("🚀 ~ Routes ~ isAuthenticated:", isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authRoutes = ["/login", "/register", "/verify-otp", "/forget-password"];
    const protectedRoutes = ["/dashboard"];

    if (!isAuthenticated && protectedRoutes.includes(location.pathname)) {
      // User is not authenticated but trying to access protected route
      navigate("/login", { replace: true });
    } else if (isAuthenticated && authRoutes.includes(location.pathname)) {
      // Authenticated user trying to access auth routes
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    //After adding route here make sure to add in above protected or authenticated routes array <3
    <AppRoutes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Index />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </AppRoutes>
  );
}
