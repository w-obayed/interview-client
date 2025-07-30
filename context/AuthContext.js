"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("token");
      const userDetails = localStorage.getItem("user");

      if (token && userDetails) {
        const userData = JSON.parse(userDetails);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }

      setIsAuthenticated(false);
      setUser(null);
      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
      return false;
    }
  };

  const userLogin = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/dashboard"];
    const publicRoutes = ["/login", "/signup"];

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isLoading) {
      if (isProtectedRoute && !isAuthenticated) {
        router.push("/login");
      } else if (isPublicRoute && isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [pathname, isAuthenticated, isLoading]);

  const value = {
    isAuthenticated,
    user,
    isLoading,
    logout,
    checkAuth,
    userLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
