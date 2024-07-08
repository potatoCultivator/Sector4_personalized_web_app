import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Step 1: Import js-cookie

// Create the context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  // Step 3: Load initial state from cookies
  const [data, setData] = useState(() => {
    const savedData = Cookies.get('data');
    return savedData ? JSON.parse(savedData) : null;
  });

  // Step 4: Update setData to also update the cookie
  const updateData = (newData) => {
    setData(newData);
    Cookies.set('data', JSON.stringify(newData)); // Save to cookies
  };

  // Value to be passed to consumers
  const value = { data, setData: updateData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => useContext(DataContext);