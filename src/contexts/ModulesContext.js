import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../api/API";

const modulesContext = createContext();

export default function ModulesContextProvider({ children }) {
  const [modules, setModules] = useState();

  useEffect(() => {
    if (!modules) API.getModules().then((res) => setModules(res.data));
  }, []);

  useEffect(() => {
    if (modules) API.getModules(5000).then((res) => setModules(res.data));
  });

  return (
    <modulesContext.Provider value={{ modules, setModules }}>
      {children}
    </modulesContext.Provider>
  );
}

export function useModulesContext() {
  const { modules, setModules } = useContext(modulesContext);
  return { modules, setModules };
}
