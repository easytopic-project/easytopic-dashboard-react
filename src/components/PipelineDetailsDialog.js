import {
  Container,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

function PipelineDetailsDialog({ open, onClose }) {
  const { newPipeline, setNewPipeline } = useNewPipelineContext();

  function onNameChange(event) {
    setNewPipeline({ ...newPipeline, name: event.target.value });
  }

  function onDescriptionChange(event) {
    setNewPipeline({ ...newPipeline, description: event.target.value });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pipeline Details</DialogTitle>
      <Container>
        <Typography>{`Version: ${newPipeline.version}`}</Typography>
        <Typography>{`ID: ${newPipeline.id}`}</Typography>
        <TextField
        fullWidth
          value={newPipeline.name}
          style={{ display: "block", marginBottom: "15px", marginTop: "15px" }}
          label="Name"
          onChange={onNameChange}
          required
        />
        <TextField
        fullWidth
          value={newPipeline.description}
          style={{ display: "block", marginBottom: "15px" }}
          label="Description"
          onChange={onDescriptionChange}
          required
        />
      </Container>
    </Dialog>
  );
}

export default PipelineDetailsDialog;
