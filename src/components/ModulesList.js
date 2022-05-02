import { Box, Typography } from "@material-ui/core";
import React from "react";
import ModuleCard from "./ModuleCard";

function ModulesList({ title, modules }) {
  if (!modules) return null;

  return (
    <Box m={2} marginTop={3} border={1} borderRadius={8} borderColor="secondary.light" p={2}>
      <Typography variant="h3">{title}</Typography>
      <Box marginTop={3}>
        {modules.map((module, index) => {
          // let date = new Date(module.connected_at);
          if (module.id) return <ModuleCard key={index} module={module} />;
          else return null;
        })}
      </Box>
    </Box>
  );
}

export default ModulesList;
