import React, { createContext, useContext, useState } from 'react';

const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  const [isLainnyaFocused, setIsLainnyaFocused] = useState(false);

  const setLainnyaFocused = (value) => {
    setIsLainnyaFocused(value);
  };

  return (
    <FocusContext.Provider value={{ isLainnyaFocused, setLainnyaFocused }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return useContext(FocusContext);
};