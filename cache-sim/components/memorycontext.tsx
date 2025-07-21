"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Results } from "./app/StatusBar";

type MemoryState = {
  results: Results[];
  setResults: (stats: Results[]) => void;
  resultsDialog: boolean;
  setResultsDialog: (value: boolean) => void;
};

const MemoryContext = createContext<MemoryState | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [resultsDialog, setResultsDialog] = useState<boolean>(false);
  const [results, setResults] = useState<Results[]>([]);

  return (
    <MemoryContext.Provider
      value={{
        results,
        setResults,
        resultsDialog,
        setResultsDialog,
      }}
    >
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
