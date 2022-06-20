import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

function AddInputDialog({ open, onClose }) {
  const { newPipeline, setNewPipeline, inputs } = useNewPipelineContext();
  const [value, setValue] = useState("image");
  const [required, setRequired] = useState(false);

  const [newInput, setNewInput] = useState({
    id: newPipeline.input.length + "-image",
    name: "",
    description: "",
    type: "file",
    required: false,
    accept: ["image/*"],
  });

  function handleChange(event) {
    setValue(event.target.value);

    if (event.target.value === "text") {
      setNewInput({
        ...newInput,
        id: newPipeline.input.length + "-" + event.target.value,
        accept: [event.target.value + "/*"],
        type: "text",
      });
    } else {
      setNewInput({
        ...newInput,
        id: newPipeline.input.length + "-" + event.target.value,
        accept: [event.target.value + "/*"],
        type: "file",
      });
    }
  }

  function handleRequiredChange(event) {
    setNewInput({ ...newInput, required: event.target.checked });
  }

  function onNameChange(event) {
    setNewInput({ ...newInput, name: event.target.value });
  }

  function onDescriptionChange(event) {
    setNewInput({ ...newInput, description: event.target.value });
  }

  function onAddInputClick(event) {
    if (!(newInput.name && newInput.description)) {
      alert("missing fields");
    } else {
      console.log(newInput);
      setNewPipeline({
        ...newPipeline,
        input: [...newPipeline.input, newInput],
      });
    }
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Input</DialogTitle>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" disabled>
                Type
              </FormLabel>
              <RadioGroup
                name="input-radio"
                value={value}
                onChange={handleChange}
              >
                {inputs.map((input, index) => (
                  <FormControlLabel
                    value={input}
                    control={<Radio />}
                    label={input}
                    key={input}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`ID: ${newInput.id}`}</Typography>
            <TextField
              value={newInput.name}
              style={{ display: "block" }}
              label="Name"
              onChange={onNameChange}
              required
            />
            <TextField
              value={newInput.description}
              style={{ display: "block" }}
              label="Description"
              onChange={onDescriptionChange}
              required
            />
            <FormControlLabel
              style={{ marginTop: "15px" }}
              control={
                <Checkbox
                  name="required"
                  checked={newInput.required}
                  onChange={handleRequiredChange}
                />
              }
              label="Required"
            ></FormControlLabel>
            <Button
              style={{ marginTop: "15px" }}
              variant="contained"
              color="primary"
              onClick={onAddInputClick}
            >
              Add Input
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default AddInputDialog;
