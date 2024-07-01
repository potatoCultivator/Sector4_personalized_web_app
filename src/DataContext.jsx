import React, { createContext, useContext, useState } from 'react';

// Create the context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null); // Initialize your state here

  // Value to be passed to consumers
  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => useContext(DataContext);