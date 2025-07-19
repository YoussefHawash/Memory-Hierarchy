"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type MemoryState = {
  results: boolean;
  setResults: (value: boolean) => void;
};

const MemoryContext = createContext<MemoryState | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<boolean>(false);

  return (
    <MemoryContext.Provider value={{ results, setResults }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemory must be used within a MemoryProvider");
  }
  return context;
};
