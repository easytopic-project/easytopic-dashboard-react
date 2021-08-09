import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/API";
import notificationSound from "../assets/notification-sound.mp3";

const jobsContext = createContext();

export default function JobsContextProvider({ children }) {
  const [jobsData, setJobsData] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }

  function playNotification() {
    const audio = new Audio(notificationSound);
    audio.play();
  }

  function showNotification(job) {
    if (Notification.permission !== "granted") return;

    const notification = new Notification("EasyTopic", {
      body: `Job ${job.id} (${job.type.toUpperCase()}) is ready`,
    });
  }

  useEffect(() => {
    if (!jobsData)
      API.getJobs().then((res) => {
        setJobsData(res.data);
      });
  }, []);

  useEffect(() => {
    if (jobsData)
      API.getJobs(5000).then((res) => {
        let completedJobs = jobsData.filter((job) =>
          res.data.find(
            (newJob) => job.id === newJob.id && job.status !== newJob.status
          )
        );
        completedJobs.forEach((job) => {
          enqueueSnackbar(
            `Job ${job.id} (${job.type.toUpperCase()}) completed`,
            { variant: "success" }
          );
          showNotification(job);
          playNotification();
        });
        if (res.data.length !== jobsData.length) {
          res.data.map((job) => {
            if (!jobsData.find((oldJob) => job.id === oldJob.id)) {
              if (job.status === "done") {
                enqueueSnackbar(
                  `Job ${job.id} (${job.type.toUpperCase()}) completed`,
                  { variant: "success" }
                );
                showNotification(job);
                playNotification();
              }
            }
          });
        }
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
