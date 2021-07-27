import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../api/API";

const jobsContext = createContext();

export default function JobsContextProvider({ children }) {
  const [jobsData, setJobsData] = useState();

  useEffect(() => {
    if (!jobsData)
      API.getJobs().then((res) => {
        setJobsData(res.data);
      });
  },[]);

  useEffect(() => {
    if (jobsData)
      API.getJobs(5000).then((res) => {
        console.log(res.data);
        if (res.data.length !== jobsData.length || res.data.find((val) => val.status !== "done"))
          console.log("seteffect");
          setJobsData(res.data);
      });
  });

  return (
    <jobsContext.Provider value={{ jobsData, setJobsData }}>
      {children}
    </jobsContext.Provider>
  );
}

export function useJobsContext() {
  const { jobsData, setJobsData } = useContext(jobsContext);
  return { jobsData, setJobsData };
}
