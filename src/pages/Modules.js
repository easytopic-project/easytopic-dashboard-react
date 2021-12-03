import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useModulesContext } from "../contexts/ModulesContext";

function Modules() {
  const { modules, setModules } = useModulesContext();

  if (!modules) return null;
  return (
    <div>
      {modules.map((module) => {
        let date = new Date(module.connected_at);
        return (
          <List key={module.connected_at}>
            <ListItem>
              {module.id ? (
                <ListItemText>
                  <Typography variant="h5">{module.name}</Typography>
                  <Typography>{module.descripion}</Typography>
                  <Typography>{module.author}</Typography>
                  <Typography>{module.email}</Typography>
                  <Typography>{date.toString()}</Typography>
                  <Typography>Input queue: {module.input_queue}</Typography>
                  <Typography>Output queue: {module.input_queue}</Typography>
                </ListItemText>
              ) : (
                <ListItemText
                  primary={`${module.product}`}
                  secondary={`${module.platform}`}
                />
              )}
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}

export default Modules;
