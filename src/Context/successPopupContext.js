"use client";

import { createContext, useState } from "react";

export const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [popupMassage, setPopupMassage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  return (
    <PopupContext.Provider
      value={{
        responseMessage,
        setResponseMessage,
        popupMassage,
        setPopupMassage,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
