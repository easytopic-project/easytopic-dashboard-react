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
} from "@material-ui/core";
import React, { useState } from "react";
import MemoryIcon from "@material-ui/icons/Memory";
import InfoIcon from "@material-ui/icons/Info";
import StepDialog from "./StepDialog";

// TODO Unificar com componente JobSteps (?)
// os componentes sao muito parecidos, a unica mudanca
// e a utilizacao do jobData como recurso visual num job
// específico

function PipelineStepsPreview({ pipeline }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState();

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen(job) {
    setOpen(true);
    console.log(job);
    setStep(job);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Steps</Typography>
        <List>
          {pipeline &&
            pipeline.jobs.map((job, index) => (
              <ListItem key={job.id}>
                <ListItemIcon>
                  <MemoryIcon />
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
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PipelineStepsPreview;
