import React, { createContext, useState, useContext, useEffect } from 'react'
import API from "../api/API";

const globalContext = createContext();

export default function GlobalContextProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);
  const [running, setRunning] = useState(false);
  const [processData, setProcessData] = useState({});
  const [pipeline, setPipeline] = useState("");
  const [inputObj, setinputObj] = useState({})
  const [pipelineOptions, setPipelineOptions] = useState();
  const [jobs, setJobs] = useState([]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setRunning(false);
    setProcessData({});
  },[pipeline])

  useEffect(() => {
    API.getPipelines().then((res) => setPipelineOptions(res.data));
  },[]);

  if (!pipelineOptions)
  return <p>Loading...</p>

  return (
    <globalContext.Provider value={{darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj, pipelineOptions, setPipelineOptions, jobs, setJobs}}>
      {children}
    </globalContext.Provider>
  );
}

export function useGlobalContext() {
  const {darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj, pipelineOptions, setPipelineOptions, jobs, setJobs} = useContext(globalContext);
  return {darkMode, toggleTheme, processData, setProcessData, running, setRunning, pipeline, setPipeline, inputObj, setinputObj, pipelineOptions, setPipelineOptions, jobs, setJobs};
}
