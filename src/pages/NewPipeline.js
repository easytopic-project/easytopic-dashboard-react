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
import AddStepDialog from "../components/AddStepDialog";
import DragAreaList from "../components/DragAreaList";
import DraggableModuleCard from "../components/DraggableModuleCard";
import GenerateJSONDialog from "../components/GenerateJSONDialog";
import PipelineDetailsDialog from "../components/PipelineDetailsDialog";
import { useModulesContext } from "../contexts/ModulesContext";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";

const inputColors = {
  image: "blue",
  text: "red",
  video: "green",
  audio: "purple",
};

function NewPipeline() {
  const { modules } = useModulesContext();

  const { inputs, newPipeline, setNewPipeline } = useNewPipelineContext();

  const [addInputDialogOpen, setAddInputDialogOpen] = useState(false);
  const [addStepDialogOpen, setAddStepDialogOpen] = useState(false);
  const [pipelineDetailsDialogOpen, setPipelineDetailsDialogOpen] =
    useState(false);
  const [generateJSONDialogOpen, setGenerateJSONDialogOpen] = useState(false);

  function handleAddInputOpen() {
    setAddInputDialogOpen(true);
  }

  function handleAddInputClose() {
    setAddInputDialogOpen(false);
  }

  function handleAddStepOpen() {
    setAddStepDialogOpen(true);
  }

  function handleAddStepClose() {
    setAddStepDialogOpen(false);
  }

  function handlePipelineDetailsOpen() {
    setPipelineDetailsDialogOpen(true);
  }

  function handlePipelineDetailsClose() {
    setPipelineDetailsDialogOpen(false);
  }

  function handleGenerateJSONOpen() {
    setGenerateJSONDialogOpen(true);
  }

  function handleGenerateJSONClose() {
    setGenerateJSONDialogOpen(false);
  }

  function addInput() {}

  if (!modules) return null;
  return (
    <Box m={2}>
      <Button variant="outlined" onClick={handlePipelineDetailsOpen}>
        Pipeline Details
      </Button>
      <PipelineDetailsDialog
        open={pipelineDetailsDialogOpen}
        onClose={handlePipelineDetailsClose}
      />

      <Button variant="outlined" onClick={handleAddInputOpen}>
        Add Initial Input
      </Button>
      <AddInputDialog open={addInputDialogOpen} onClose={handleAddInputClose} />

      <Button variant="outlined"  onClick={handleAddStepOpen}>Add Step</Button>
      <AddStepDialog open={addStepDialogOpen} onClose={handleAddStepClose}/>

      <Button variant="outlined" onClick={handleGenerateJSONOpen}>
        Generate JSON
      </Button>
      <GenerateJSONDialog
        open={generateJSONDialogOpen}
        onClose={handleGenerateJSONClose}
      />
       <input
        accept="application/json"
        id="load-json"
        type="file"
        style={{display: "none"}}
      />
      <label htmlFor="load-json">
        <Button variant="outlined" component="span">
          Load JSON
        </Button>
      </label>

      {/* Inputs */}
      {newPipeline &&
        newPipeline.input.map((input, index) => {
          console.log(input);
          return (
            <Draggable>
              <Card
                style={{
                  width: "100px",
                  backgroundColor: inputColors[input.accept[0].split("/")[0]],
                }}
              >
                <CardContent>{input.id}</CardContent>
              </Card>
            </Draggable>
          );
        })}
    </Box>
  );
}

export default NewPipeline;
