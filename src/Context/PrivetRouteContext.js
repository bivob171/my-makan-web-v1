"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const PrivateRouteContext = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const [customEventData, setCustomEventData] = useState(null); // Track custom event data

  const logOut = useCallback(() => {
    setLoading(true);
    setUser(null);
    localStorage.clear();
    router.push("/");
    setRender(!render);
    signOut({ callbackUrl: "/" });
  }, []);

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

    const getStoredToken = (role) =>
      localStorage.getItem(`${role}AccessToken`)?.replace(/"/g, "");

    const userRole = localStorage.getItem("role");
    const endpoint =
      userRole === "agent"
        ? "http://api.mymakan.ae/agent/myProfile"
        : "http://api.mymakan.ae/user/myProfile";

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

  useEffect(() => {
    let socket;

    if (user) {
      socket = io("http://api.mymakan.ae");
      // Ensure this matches your backend's URL
      socket.on("connect", () => {
        socket.emit("userConnected", { userId: user._id });
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("customEvent", (data) => {
        console.log("Custom event received:", data);
        setCustomEventData(data);
      });
    }

    return () => {
      if (socket) {
        socket.emit("userDisconnected", { userId: user._id }); // Emit before disconnect
        socket.disconnect();
      }
    };
  }, [user]);

  return {
    isAuthenticated,
    user,
    loading,
    setRender,
    render,
    logOut,
    isConnected,
    setIsConnected,
    customEventData,
    setCustomEventData,
  };
};

export default PrivateRouteContext;
