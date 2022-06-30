import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import AddInputDialog from "../components/AddInputDialog";
import AddStepDialog from "../components/AddStepDialog";
import DragAreaList from "../components/DragAreaList";
import DraggableModuleCard from "../components/DraggableModuleCard";
import GenerateJSONDialog from "../components/GenerateJSONDialog";
import PipelineDetailsDialog from "../components/PipelineDetailsDialog";
import { useModulesContext } from "../contexts/ModulesContext";
import { useNewPipelineContext } from "../contexts/NewPipelineContext";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

const inputColors = {
  image: "blue",
  text: "red",
  video: "green",
  audio: "purple",
};

function NewPipeline() {
  const { modules } = useModulesContext();
  const updateXarrow = useXarrow();

  const { inputs, newPipeline, setNewPipeline } = useNewPipelineContext();

  const [addInputDialogOpen, setAddInputDialogOpen] = useState(false);
  const [addStepDialogOpen, setAddStepDialogOpen] = useState(false);
  const [pipelineDetailsDialogOpen, setPipelineDetailsDialogOpen] =
    useState(false);
  const [generateJSONDialogOpen, setGenerateJSONDialogOpen] = useState(false);

  useEffect(() => {
    updateXarrow();
  }, [newPipeline]);

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
    <Xwrapper>
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
        <AddInputDialog
          open={addInputDialogOpen}
          onClose={handleAddInputClose}
        />

        <Button variant="outlined" onClick={handleAddStepOpen}>
          Add Step
        </Button>
        <AddStepDialog open={addStepDialogOpen} onClose={handleAddStepClose} />

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
          style={{ display: "none" }}
        />
        <label htmlFor="load-json">
          <Button variant="outlined" component="span">
            Load JSON
          </Button>
        </label>

        {/* Inputs */}
        {newPipeline &&
          newPipeline.input.map((input, index) => {
            return (
              <Draggable
                key={input.id}
                onDrag={updateXarrow}
                onStop={updateXarrow}
              >
                <Card
                  style={{
                    width: "100px",
                    backgroundColor: inputColors[input.accept[0].split("/")[0]],
                  }}
                >
                  <CardContent>
                    <Typography id={input.id}>{input.id}</Typography>
                  </CardContent>
                </Card>
              </Draggable>
            );
          })}
        {/* Modules */}
        {newPipeline &&
          newPipeline.jobs.map((job, index) => {
            return (
              <Draggable
                key={job.id}
                onDrag={updateXarrow}
                onStop={updateXarrow}
              >
                <Card
                  style={{
                    width: "200px",
                    //backgroundColor: inputColors[input.accept[0].split("/")[0]],
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">{job.id.toUpperCase()}</Typography>
                    <Typography>---- Inputs ----</Typography>
                    {Object.entries(job.arguments).map(
                      (
                        arg //TODO Talvez mapear o modulo original e separar a arrow
                      ) => (
                        <Typography
                          style={{
                            backgroundColor: "green",
                            borderRadius: "10px",
                            margin: "10px",
                            textAlign: "center",
                          }}
                          key={arg[0] + arg[1]}
                          id={job.id + arg[0]}
                        >
                          {arg[0]}
                        </Typography>
                      )
                    )}
                    <Typography>---- Outputs ----</Typography>
                    {job.output.map((out) => (
                      <Typography
                        style={{
                          backgroundColor: "red",
                          borderRadius: "10px",
                          margin: "10px",
                          textAlign: "center",
                        }}
                        key={job.id + ":" + out}
                        id={job.id + ":" + out}
                      >
                        {out}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Draggable>
            );
          })}
        {/* Arrows */}
        {newPipeline.jobs.map((job, index) => {
          return Object.entries(job.arguments).map((arg) => {
            return (
              <Xarrow
                key={arg[1] + arg[0]}
                start={arg[1]}
                end={job.id + arg[0]}
              />
            );
          });
        })}
      </Box>
    </Xwrapper>
  );
}

export default NewPipeline;
