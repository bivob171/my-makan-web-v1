"use client";

import { useEffect, useState } from "react";

const NotificationValueContext = () => {
  const [notificationRerander, setnotificationRerander] = useState(false);
  const [profile, setProfile] = useState();
  const [allNotificationNumber, setAllNotificationNumber] = useState(0);

  const fetchUserProfile = async () => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

    const endpoint =
      userRole === "agent"
        ? "https://q2p08zg4-4000.asse.devtunnels.ms/agent/myProfile"
        : "https://q2p08zg4-4000.asse.devtunnels.ms/user/myProfile";
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
        const totalAllnotify = profile?.notification?.allNotification;
        setAllNotificationNumber(totalAllnotify);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [notificationRerander]);

  return {
    setAllNotificationNumber,
    notificationRerander,
    setnotificationRerander,
    allNotificationNumber,
  };
};

export default NotificationValueContext;
