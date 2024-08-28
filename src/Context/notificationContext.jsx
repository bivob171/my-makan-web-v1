"use client";

import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notificationRerander, setnotificationRerander] = useState(false);
  const [allNotificationNumber, setAllNotificationNumber] = useState(0);
  const [profile, setProfile] = useState();

  const fetchUserProfile = async () => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

    const endpoint =
      userRole === "agent"
        ? "https://api.mymakan.ae/agent/myProfile"
        : "https://api.mymakan.ae/user/myProfile";
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      } else {
        const profile = await response.json();
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [notificationRerander]);

  return (
    <NotificationContext.Provider
      value={{
        setAllNotificationNumber,
        notificationRerander,
        setnotificationRerander,
        allNotificationNumber,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
