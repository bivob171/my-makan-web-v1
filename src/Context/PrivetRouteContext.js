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
        ? "https://q2p08zg4-4000.asse.devtunnels.ms/agent/myProfile"
        : "https://q2p08zg4-4000.asse.devtunnels.ms/user/myProfile";

    const token = getStoredToken(userRole);
    if (token) {
      fetchUserProfile(token, endpoint);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const [activeUsers, setActiveUsers] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState({});

  useEffect(() => {
    let socket;

    if (user) {
      socket = io("https://q2p08zg4-4000.asse.devtunnels.ms");

      // Emit user connected event
      socket.emit("userConnected", { userId: user._id });

      // Handle connection established
      setIsConnected(true);

      // Handle user connection
      socket.on("userConnected", (data) => {
        setActiveUsers((prevUsers) => [...prevUsers, data.userId]);
        setLastActiveTime((prevTimes) => {
          const newTimes = { ...prevTimes };
          delete newTimes[data.userId]; // Remove last active time since the user is now connected
          return newTimes;
        });
      });

      // Handle user disconnection
      socket.on("userDisconnected", (data) => {
        setActiveUsers((prevUsers) =>
          prevUsers.filter((id) => id !== data.userId)
        );
        setLastActiveTime((prevTimes) => ({
          ...prevTimes,
          [data.userId]: data.lastActiveTime,
        }));
      });

      // Handle custom events
      socket.on("customEvent", (data) => {
        setCustomEventData(data);
      });
    }

    return () => {
      if (socket) {
        socket.emit("userDisconnected", { userId: user._id });
        socket.disconnect();
        setIsConnected(false);
      }
    };
  }, [user]);

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

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
    lastActiveTime,
    timeAgo,
  };
};

export default PrivateRouteContext;
