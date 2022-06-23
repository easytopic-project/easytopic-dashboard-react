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
  const { modules } = useModulesContext();

  const [chosenModule, setChosenModule] = useState();

  console.log(modules);

  function handleSelectChange(event) {
    setChosenModule(modules.find((mod) => mod.id === event.target.value));
  }

  function handleInputSelectChange() {} //TODO implement function 

  function possibleImages() {
    const possibilities = newPipeline.input.filter((input, index) =>
      input.accept.find((elem) => elem.includes("image"))
    );
    return possibilities;
  }

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
                value={(chosenModule && chosenModule.id) || ""}
                onChange={handleSelectChange}
              >
                {modules.map((module, index) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {chosenModule ? (
              <>
                <Typography variant="h6">Description:</Typography>
                <Typography>{chosenModule.description}</Typography>

                <Typography variant="h6">Author:</Typography>
                <Typography>{chosenModule.author}</Typography>

                <Typography variant="h6">E-mail:</Typography>
                <Typography>{chosenModule.email}</Typography>
              </>
            ) : null}
          </Grid>
          <Grid item>
            {chosenModule ? (
              <>
                <Typography>Inputs</Typography>
                {chosenModule.input.map((input, index) => (
                  <FormControl fullWidth>
                    <InputLabel id={"select-input-label-" + index}>
                      {input.id}
                    </InputLabel>
                    <Select
                      labelId={"select-input-label" + index}
                      id={"select-input" + index}
                      value={""}
                      onChange={handleInputSelectChange}
                    >
                      {possibleImages().map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default AddStepDialog;
