import React, { useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { useGlobalContext } from "../../contexts/GlobalContext";
import API from "../../api/API";
import JobHeader from "../../components/JobHeader";
import JobResults from "../../components/JobResults";
import JobSteps from "../../components/JobSteps";
import TimeChart from "../../components/TimeChart";
import TimelineChart from "../../components/TimelineChart";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));

export default function PipelineResult({
  match: {
    params: { id },
  },
}) {
  const classes = useStyle();
  const { pipelineOptions } = useGlobalContext();
  const [pipeline, setPipeline] = useState();
  const [jobData, setJobData] = useState();

  useEffect(() => {
    if (!jobData || jobData.status !== "done") {
      API.getJob(id).then((res) => {
        setJobData(res.data);
        setPipeline(
          pipelineOptions.find((pipeline) => pipeline.id === res.data.type)
        );
      });
    }
  }, [jobData]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <JobHeader jobData={jobData} pipeline={pipeline} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <JobSteps jobData={jobData} pipeline={pipeline} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <TimeChart jobData={jobData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <JobResults jobData={jobData} pipeline={pipeline} />
        </Grid>
      </Grid>
    </div>
  );
}
