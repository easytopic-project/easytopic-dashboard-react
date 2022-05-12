import {
  Button,
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
  const { newPipeline, inputs } = useNewPipelineContext();
  const [value, setValue] = useState("image");

  const [newInput, setNewInput] = useState({
    id: newPipeline.input.length + "-image",
    name: "Image" + newPipeline.input.length,
    description: "",
    type: "file",
    required: true,
    accept: ["image/*"],
  });

  function handleChange(event) {
    setValue(event.target.value);
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
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>{`ID: ${newInput.id}`}</Typography>
            <TextField style={{ display: "block" }} label="Name" />
            <TextField style={{ display: "block" }} label="Description" />
            <Button variant="contained" color="primary">
              Add Input
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default AddInputDialog;
