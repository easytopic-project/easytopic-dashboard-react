import {
  Card,
  CardContent,
  ListItem,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import StepDialog from "./StepDialog";

// o nome de "jobs" está um pouco confuso aqui, ja que um serviço
// executado pelo usuario se chama job e os passos de um processamento tambem

function JobSteps({ jobData, pipeline }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState();

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen(job) {
    setOpen(true);
    setStep(job);
  }

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h4">Steps</Typography>
        <List>
          {pipeline &&
            jobData &&
            pipeline.jobs.map((job, index) => (
              <>
                {job.jobs
                  ? job.jobs.map((insideJob) => (
                      <ListItem key={insideJob.id}>
                        <ListItemIcon>
                          {jobData.jobStatus[insideJob.id].finishAt  ? (
                            <CheckCircleIcon style={{ color: "green" }} />
                          ) : 
                          <CircularProgress
                          size="1.5rem"
                          thickness={8}
                          color="secondary"
                        />}
                        </ListItemIcon>

                        <ListItemText
                          primary={insideJob.id}
                          secondary={false ? "texto secundário" : null}
                        />

                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="info"
                            onClick={() => handleClickOpen(insideJob)}
                          >
                            <InfoIcon />
                          </IconButton>
                          <StepDialog
                            step={step}
                            open={open}
                            onClose={handleClose}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  : null}
                <ListItem key={job.id}>
                  <ListItemIcon>
                    {jobData.jobStatus[job.id].finishAt  ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : 
                    <CircularProgress
                        size="1.5rem"
                        thickness={8}
                        color="secondary"
                      /> }
                  </ListItemIcon>

                  <ListItemText
                    primary={job.id}
                    secondary={false ? "texto secundário" : null}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="info"
                      onClick={() => handleClickOpen(job)}
                    >
                      <InfoIcon />
                    </IconButton>
                    <StepDialog step={step} open={open} onClose={handleClose} />
                  </ListItemSecondaryAction>
                </ListItem>
              </>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default JobSteps;
