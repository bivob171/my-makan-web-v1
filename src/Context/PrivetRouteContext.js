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
    localStorage.clear();
    router.push("/");
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
        ? "https://api.mymakan.ae/agent/myProfile"
        : "https://api.mymakan.ae/user/myProfile";

    const token = getStoredToken(userRole);
    if (token) {
      fetchUserProfile(token, endpoint);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    let socket;

    if (user) {
      socket = io("https://api.mymakan.ae");

      // Handle user connection
      socket.on("userConnected", (data) => {
        setActiveUsers((prevUsers) => [...prevUsers, data.userId]);
      });

      // Handle user disconnection
      socket.on("userDisconnected", (data) => {
        setActiveUsers((prevUsers) =>
          prevUsers.filter((id) => id !== data.userId)
        );
      });
    }

    return () => {
      if (socket) {
        socket.emit("userDisconnected", { userId: user._id });
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
    activeUsers,
  };
};

export default PrivateRouteContext;
