import React, { createContext, useState, useContext, useEffect } from 'react'

const globalContext = createContext();

export default function GlobalContextProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);
  const [running, setRunning] = useState(false);
  const [processData, setProcessData] = useState({});
  const [pipeline, setPipeline] = useState({
    version: "",
    id: "",
    name: "",
    description: "",
    input: [],
    output: [],
  });
  const [inputObj, setinputObj] = useState({})

  function toggleTheme() {
    setDarkMode(!darkMode);
  };

  // quick fix, repair later (?)
  useEffect(() => {
    setRunning(false);
    setProcessData({});
    console.log("running false");
  },[pipeline])

  return (
    <globalContext.Provider value={{darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj}}>
      {children}
    </globalContext.Provider>
  );
}

export function useGlobalContext() {
  const {darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj} = useContext(globalContext);
  return {darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj};
}
