"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const PrivateRouteContext = () => {
  const router = useRouter();
  const [render, setRender] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logOut = () => {
    setLoading(true);
    setUser(null);
    setLoading(false);
    localStorage.removeItem("buyerAccessToken");
    localStorage.removeItem("buyerRefreshToken");
    localStorage.removeItem("buyerTokenExpires_in");
    localStorage.removeItem("buyerId");
    localStorage.removeItem("role");
    localStorage.removeItem("agentAccessToken");
    localStorage.removeItem("agentRefreshToken");
    localStorage.removeItem("agentTokenExpires_in");
    localStorage.removeItem("agentId");
    localStorage.removeItem("role");
    setRender((prev) => !prev);
    router.push("/");
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const fetchUserProfile = async (token, endpoint) => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const getStoredToken = (role) => {
      const token = localStorage.getItem(`${role}AccessToken`);
      return token ? token.replace(/"/g, "") : null;
    };

    const userRole = localStorage.getItem("role");
    let endpoint = null;

    if (userRole === "agent") {
      endpoint = `https://q4m0gph5-4000.asse.devtunnels.ms/agent/myProfile`;
    } else if (userRole === "buyer") {
      endpoint = `https://q4m0gph5-4000.asse.devtunnels.ms/user/myProfile`;
    }

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
  }, [render]);

  return { isAuthenticated, user, loading, setError, setRender, logOut };
};

export default PrivateRouteContext;
