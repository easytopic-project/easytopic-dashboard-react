import React, { createContext, useState, useContext, useEffect } from "react";

const loginContext = createContext();

export default function LoginContextProvider({ children }) {
  const [auth, setAuth] = useState(true); // TODO change to false
  const [admin, setAdmin] = useState(true);

  function validateLogin(login) {
    if (login.username === "user" && login.password === "user") {
      setAuth(true);
      alert("Succesfull user login");
      return true;
    } else if (login.username === "admin" && login.password === "admin") {
      setAuth(true);
      setAdmin(true);
      alert("Succesfull admin login");
      return true;
    }
  }

  return (
    <loginContext.Provider value={{ auth, admin, validateLogin }}>
      {children}
    </loginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(loginContext);
}
