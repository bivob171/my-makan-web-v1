"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useCallback } from "react";

const PrivateRouteContext = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logOut = useCallback(() => {
    setLoading(true);
    setUser(null);
    localStorage.clear();
    router.push("/");
    signOut({ callbackUrl: "/" });
  }, [router]);

  useEffect(() => {
    const fetchUserProfile = async (token, endpoint) => {
      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const getStoredToken = (role) => localStorage.getItem(`${role}AccessToken`)?.replace(/"/g, "");

    const userRole = localStorage.getItem("role");
    const endpoint = userRole === "agent" ? "http://3.28.239.173:4000/agent/myProfile" : "http://3.28.239.173:4000/user/myProfile";
    
    if (endpoint) {
      const token = getStoredToken(userRole);
      if (token) {
        fetchUserProfile(token, endpoint);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, user, loading, logOut };
};

export default PrivateRouteContext;
