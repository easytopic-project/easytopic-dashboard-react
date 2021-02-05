import React, { createContext, useState, useContext } from 'react'

const globalContext = createContext();

export default function GlobalContextProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  };

  return (
    <globalContext.Provider value={{darkMode, toggleTheme}}>
      {children}
    </globalContext.Provider>
  );
}

export function useGlobalContext() {
  const {darkMode, toggleTheme} = useContext(globalContext);
  return {darkMode, toggleTheme};
}
