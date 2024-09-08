"use client";

import { createContext, useEffect, useState } from "react";

export const PremiumValueContext = createContext();

const PremiumValueProvider = ({ children }) => {
  const [premiumPopup, setPremiumPopup] = useState(false);

  return (
    <PremiumValueContext.Provider
      value={{
        premiumPopup,
        setPremiumPopup,
      }}
    >
      {children}
    </PremiumValueContext.Provider>
  );
};

export default PremiumValueProvider;
