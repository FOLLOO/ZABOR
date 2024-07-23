import { createContext, useState } from 'react'

export const OverlayContext = createContext();

export const OverlayContextProvider = ({ children }) => {
  const [overlay, setOverlay] = useState(false);
  const [someOpen, setSomeOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ overlay, setOverlay, someOpen, setSomeOpen }} >
      {children}
    </OverlayContext.Provider>
  );
};
