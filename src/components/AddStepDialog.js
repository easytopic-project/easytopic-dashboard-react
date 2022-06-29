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

  const [newModule, setNewModule] = useState({
    id: "",
    queues: [
      { env: "", default: "" },
      { env: "", default: "" },
    ],
    arguments: {},
    output: [],
  });

  const [newModuleOutput, setNewModuleOutput] = useState([
    {
      id: "",
      from: "",
      type: "",
      name: "",
      description: "",
    },
  ]);

  function handleSelectChange(event) {
    const mod = modules.find((mod) => mod.id === event.target.value);
    setChosenModule(mod);

    setNewModule({
      ...newModule,
      id: mod.id,
      queues: [
        { env: "", default: mod.input_queue },
        { env: "", default: mod.output_queue },
      ],
      output: mod.output.map((elem, index) => elem.id),
    }); //TODO change id

    setNewModuleOutput(
      mod.output.map((elem) => ({
        id: elem.id,
        from: mod.id,
        type: elem.type,
        name: "",
        description: "",
      }))
    );
  }

  function handleInputSelectChange(event, input) {
    setNewModule({
      ...newModule,
      arguments: { ...newModule.arguments, [input.id]: event.target.value },
    });
  }

  console.log(newModule);
  console.log(newModuleOutput);

  function possibleInputs() {
    const possibilities = newPipeline.input;
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
                  <FormControl fullWidth key={input.id}>
                    <InputLabel id={"select-input-label-" + index}>
                      {input.id}
                    </InputLabel>
                    <Select
                      labelId={"select-input-label" + index}
                      id={"select-input" + index}
                      value={newModule.arguments[input.id] || ""}
                      onChange={(event) =>
                        handleInputSelectChange(event, input)
                      }
                    >
                      {possibleInputs().map((item) => (
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
