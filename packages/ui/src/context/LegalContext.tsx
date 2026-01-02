'use client';

import { createContext, useContext, useState } from 'react';

type LegalContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export const useLegalContext = () => {
  const context = useContext(LegalContext);
  if (!context)
    throw new Error('LegalContext must be used within a LegalProvider');
  return context;
};

export const LegalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <LegalContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </LegalContext.Provider>
  );
};
