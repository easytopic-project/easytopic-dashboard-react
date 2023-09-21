import {
  Button,
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

  function onCloseWithCheck() {
    if (!newPipeline.name || !newPipeline.description) {
      alert("Mising fields");
    } else {
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={onCloseWithCheck} fullWidth maxWidth="sm">
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
        <Button
          style={{ margin: "15px 15px 15px 85%"}}
          variant="contained"
          color="primary"
          onClick={onCloseWithCheck}
        >
          Ok
        </Button>
      </Container>
    </Dialog>
  );
}

export default PipelineDetailsDialog;
