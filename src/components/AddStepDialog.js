import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
      arguments: {},
      output: mod.output.map((elem, index) => elem.id),
    }); //TODO change id

    setNewModuleOutput(
      mod.output.map((elem) => ({
        id: elem.id,
        from: mod.id + ":" + elem.id,
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

  function possibleInputs() {
    const possibilities = [...newPipeline.input, ...newPipeline.output];
    console.log(possibilities);
    return possibilities;
  }

  function onAddStepClick(event) {
    if (!(newModule.id && newModule.arguments)) {
      alert("missing fields");
    } else {
      setNewPipeline({
        ...newPipeline,
        jobs: [...newPipeline.jobs, newModule],
        output: [...newPipeline.output, ...newModuleOutput],
      });
    }
    onClose();
  }

  function onNameChange(event, outId) {
    const outIndex = chosenModule.output.findIndex((elem) => elem.id === outId);
    const newOut = [...newModuleOutput];

    newOut[outIndex]["name"] = event.target.value;

    setNewModuleOutput(newOut);
  }

  function onDescriptionChange(event, outId) {
    const outIndex = chosenModule.output.findIndex((elem) => elem.id === outId);
    const newOut = [...newModuleOutput];

    newOut[outIndex]["description"] = event.target.value;

    setNewModuleOutput(newOut);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Step</DialogTitle>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
                      {possibleInputs().map((item) =>
                        item.from ? (
                          <MenuItem key={item.id} value={item.from}>
                            {item.from}
                          </MenuItem>
                        ) : (
                          <MenuItem key={item.id} value={item.id}>
                            {item.id}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                ))}
              </>
            ) : null}
          </Grid>
          <Grid item xs={4}>
            {chosenModule ? (
              <>
                <Typography>Outputs</Typography>
                {chosenModule.output.map((out, index) => (
                  <>
                    <Typography>ID: {out.id}</Typography>
                    <Typography>Type: {out.type}</Typography>
                    <TextField
                      value={out.name}
                      style={{ display: "block" }}
                      label="Name"
                      onChange={(event) => onNameChange(event, out.id)}
                      required
                    />
                    <TextField
                      value={out.description}
                      style={{ display: "block" }}
                      label="Description"
                      onChange={(event) => onDescriptionChange(event, out.id)}
                      required
                    />
                  </>
                ))}{" "}
              </>
            ) : null}

            <Button
              style={{ marginTop: "15px" }}
              variant="contained"
              color="primary"
              onClick={onAddStepClick}
            >
              Add Input
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default AddStepDialog;
