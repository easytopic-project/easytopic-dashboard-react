import {
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useModulesContext } from "../contexts/ModulesContext";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

function AddStepDialog({ open, onClose }) {
  const { newPipeline, setNewPipeline, inputs } = useNewPipelineContext();
  const { modules } = useModulesContext({});

  const [chosenModule, setChosenModule] = useState();

  console.log(modules);

  function handleSelectChange() {}

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Step</DialogTitle>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-module-label">Module</InputLabel>
              <Select
                labelId="select-module-label"
                id="select-module"
                value={chosenModule}
                onChange={handleSelectChange}
              >
                {modules.map((module, index) => (
                  <MenuItem key={module.id} value={module}>
                    {module.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default AddStepDialog;
