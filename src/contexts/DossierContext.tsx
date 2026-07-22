import React, { createContext, useContext, useState } from 'react';

interface DossierContextType {
  isDecrypted: boolean;
  toggleDecrypted: () => void;
  setDecrypted: (val: boolean) => void;
  isMuted: boolean;
  toggleMuted: () => void;
}

const DossierContext = createContext<DossierContextType | undefined>(undefined);

export function DossierProvider({ children }: { children: React.ReactNode }) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleDecrypted = () => {
    setIsDecrypted((prev) => !prev);
  };
  
  const toggleMuted = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <DossierContext.Provider value={{ isDecrypted, toggleDecrypted, setDecrypted: setIsDecrypted, isMuted, toggleMuted }}>
      {children}
    </DossierContext.Provider>
  );
}

export function useDossier() {
  const context = useContext(DossierContext);
  if (context === undefined) {
    throw new Error('useDossier must be used within a DossierProvider');
  }
  return context;
}
