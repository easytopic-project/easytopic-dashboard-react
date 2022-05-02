import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import React from "react";
import { useDrag } from "react-dnd";
import SettingsIcon from "@material-ui/icons/Settings";

function DraggableModuleCard({
  module,
  type,
  output,
  config,
  clickOpen,
  configurable,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name: module.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const colorDict = {
    Audio: "green",
    Text: "red",
    Image: "blue",
    Video: "purple",
  };

  const backgroundColor = colorDict[module.name];

  return (
    <Card
      raised
      ref={drag}
      style={{ border: isDragging ? "2px solid white" : "0px", margin: "5px", backgroundColor: backgroundColor ? backgroundColor : null }}
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          {type !== "input" ? (
            <Grid item xs={1}>
              <div
                style={{
                  backgroundColor: "blue",
                  marginBottom: "3px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
            </Grid>
          ) : null}
          <Grid item>
            <Typography>{module.name}</Typography>
          </Grid>
          {type !== "input" ? (
            <Grid item xs={1}>
              <div
                style={{
                  backgroundColor: "red",
                  marginBottom: "3px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
            </Grid>
          ) : null}
        </Grid>
        {configurable ? (
          <IconButton aria-label="config" onClick={() => clickOpen()}>
            <SettingsIcon />
          </IconButton>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default DraggableModuleCard;
