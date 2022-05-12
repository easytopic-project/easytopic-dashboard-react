import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Draggable from "react-draggable";
import AddInputDialog from "../components/AddInputDialog";
import DragAreaList from "../components/DragAreaList";
import DraggableModuleCard from "../components/DraggableModuleCard";
import { useModulesContext } from "../contexts/ModulesContext";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

function NewPipeline() {
  const { modules } = useModulesContext();

  const { inputs, newPipeline, setNewPipeline } = useNewPipelineContext();

  const [addInputDialogOpen, setAddInputDialogOpen] = useState(false);

  function handleAddInputOpen() {
    setAddInputDialogOpen(true);
  }

  function handleAddInputClose() {
    setAddInputDialogOpen(false);
  }

  function addInput() {}

  if (!modules) return null;
  return (
    <Box m={2}>
      <Button variant="outlined">Pipeline Details</Button>

      <Button variant="outlined" onClick={handleAddInputOpen}>
        Add Initial Input
      </Button>
      <AddInputDialog open={addInputDialogOpen} onClose={handleAddInputClose} />

      <Button variant="outlined">Add Job</Button>
      <Button variant="outlined">Generate JSON</Button>

      {/* Inputs */}
      {newPipeline &&
        newPipeline.input.map((input, index) => {
          console.log(input);
          return (
            <Draggable>
              <Card style={{ width: "100px" }}>
                <CardContent>{input.id}</CardContent>
              </Card>
            </Draggable>
          );
        })}
    </Box>
  );
}

export default NewPipeline;
