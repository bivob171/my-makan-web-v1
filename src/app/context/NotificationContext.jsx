import React, { createContext, useRef, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notificationRefs = useRef({});

  const registerRef = (id, ref) => {
    notificationRefs.current[id] = ref;
  };

  const getRef = (id) => notificationRefs.current[id];

  return (
    <NotificationContext.Provider value={{ registerRef, getRef }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
