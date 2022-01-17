import { Box } from "@material-ui/core";
import React from "react";
import ModuleCard from "./ModuleCard";

function ModulesList({ modules }) {
  if (!modules) return null;

  return (
    <Box>
      {modules.map((module, index) => {
        // let date = new Date(module.connected_at);
        if (module.id) return <ModuleCard key={index} module={module} />;
        else return null; 
      })}
    </Box>
  );
}

export default ModulesList;
