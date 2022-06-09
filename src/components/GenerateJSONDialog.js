import { Container, Dialog, DialogTitle, Typography } from "@material-ui/core";
import React from "react";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

function GenerateJSONDialog({ open, onClose }) {
  const { newPipeline } = useNewPipelineContext();
    console.log(JSON.stringify(newPipeline, null, 4));
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pipeline Script</DialogTitle>
      <Container>
        <Typography component="pre">{JSON.stringify(newPipeline, null, 4)}</Typography>
      </Container>
    </Dialog>
  );
}

export default GenerateJSONDialog;
