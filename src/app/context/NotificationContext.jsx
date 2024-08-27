
"use client";
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationData, setNotificationData] = useState(null);

  const handleNotificationClick = (notification) => {
    setNotificationData(notification);
  };

  return (
    <NotificationContext.Provider value={{ notificationData, handleNotificationClick }}>
      {children}
    </NotificationContext.Provider>
  );
};
