import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [increasedSpacing, setIncreasedSpacing] = useState(8);

  return (
    <AccessibilityContext.Provider
      value={{
        increasedSpacing,
        setIncreasedSpacing,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
