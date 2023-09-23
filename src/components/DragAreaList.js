import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DraggableModuleCard from "./DraggableModuleCard";
import { useDrop } from "react-dnd";
import NewPipelineInputDialog from "./NewPipelineInputDialog";

function DragAreaList({ accept }) {
  const [modules, setModules] = useState([]);
  const [open, setOpen] = useState(false);
  const [currModule, setCurrModule] = useState();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: accept,
    drop: (item) => addCard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addCard(item) {
    setModules((modules) => [...modules, item.name]);
    setCurrModule(item.name);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen(module) {
    setOpen(true);
    setCurrModule(module);
  }

  if (!modules) return null;

  return (
    <>
      <Box
        m={2}
        marginTop={3}
        border={1}
        borderRadius={8}
        borderColor="secondary.light"
        p={2}
        ref={drop}
      >
        <Typography variant="h4">{accept === "input" ? "Initial Data" : "Modules Step"}</Typography>
        <Box marginTop={3}>
          {modules.map((module, index) => {
            if (true)
              return (
                <>
                  <DraggableModuleCard
                    key={index}
                    module={{ name: module }}
                    type={accept}
                    clickOpen={() => handleClickOpen(module)}
                    configurable
                  />
                </>
              );
            else return null;
          })}
        </Box>
      </Box>
      <NewPipelineInputDialog
        input={currModule}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default DragAreaList;
