import { Box, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DragAreaList from "../components/DragAreaList";
import DraggableModuleCard from "../components/DraggableModuleCard";
import { useModulesContext } from "../contexts/ModulesContext";

function NewPipeline() {
  const { modules } = useModulesContext();

  const [newPipeline, setNewPipeline] = useState({
    version: "1.0",
    id: "newPipeline1",
    name: "New Pipeline Name",
    description: "New Pipeline Description",
    input: [
      // { //example
      //   id: "image",
      //   name: "Image",
      //   description: "The image from the OCR will be generated",
      //   type: "file",
      //   required: true,
      //   accept: ["image/*"],
      // },
    ],
    output: [
      // { //example
      //   id: "ocr",
      //   from: "ocr-service:ocr",
      //   type: "text",
      //   name: "OCR Result",
      //   description: "The result of the OCR processing",
      // },
    ],
    jobs: [
      {
        id: "ocr-final",
        queues: [
          { env: "", default: "" }, //{ env: "OCR_INPUT_QUEUE", default: "ocr-in" },
          { env: "", default: "" }, //{ env: "OCR_OUTPUT_QUEUE", default: "ocr-out" },
        ],
        arguments: {}, //arguments: { file: "image" },
        output: [], //output: ["ocr"],
      },
    ],
  });

  const inputs = ["Audio", "Text", "Video", "Image"];

  if (!modules) return null;
  return (
    <Box m={2}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="h4">Avaiable Initial Data</Typography>
          <Box
            m={2}
            marginTop={3}
            border={1}
            borderRadius={8}
            borderColor="secondary.light"
            p={2}
          >
            {inputs.map((input, index) => (
              <DraggableModuleCard
                key={index}
                module={{ name: input }}
                type={"input"}
                output={"audio"} //TODO audio just for testing
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">Avaiable Modules</Typography>
          <Box
            m={2}
            marginTop={3}
            border={1}
            borderRadius={8}
            borderColor="secondary.light"
            p={2}
            display="flex"
          >
            {modules
              .filter((module) => module.containerInfo.State === "running")
              .map((module, index) => {
                if (module.id)
                  return (
                    <DraggableModuleCard
                      key={index}
                      module={module}
                      type={"card"}
                    />
                  );
                else return null;
              })}
          </Box>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={2}>
            <DragAreaList accept={"input"} />
          </Grid>
          <Grid item xs={2}>
            <DragAreaList accept={"card"} />
          </Grid>
          <Grid item xs={2}>
            <DragAreaList accept={"card"} />
          </Grid>
        </Grid>
        <Box />
      </Grid>
    </Box>
  );
}

export default NewPipeline;
