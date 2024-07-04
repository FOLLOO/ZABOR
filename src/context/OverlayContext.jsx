import { createContext, useState } from 'react'

export const OverlayContext = createContext();

export const OverlayContextProvider = ({ children }) => {
  const [overlay, setOverlay] = useState(false);

  return (
    <OverlayContext.Provider value={{ overlay, setOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};
