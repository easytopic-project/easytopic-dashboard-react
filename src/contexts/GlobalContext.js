import React, { createContext, useState, useContext } from 'react'

const globalContext = createContext();

export default function GlobalContextProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);
  const [running, setRunning] = useState(false);
  const [processData, setProcessData] = useState({});

  function toggleTheme() {
    setDarkMode(!darkMode);
  };

  return (
    <globalContext.Provider value={{darkMode, toggleTheme, processData, setProcessData, running, setRunning}}>
      {children}
    </globalContext.Provider>
  );
}

export function useGlobalContext() {
  const {darkMode, toggleTheme, processData, setProcessData, running, setRunning} = useContext(globalContext);
  return {darkMode, toggleTheme, processData, setProcessData, running, setRunning};
}
