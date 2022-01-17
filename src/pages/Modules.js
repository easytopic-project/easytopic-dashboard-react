import { Box, Grid } from "@material-ui/core";

import React from "react";
import AddModule from "../components/AddModule";
import ModulesList from "../components/ModulesList";
import { useModulesContext } from "../contexts/ModulesContext";

function Modules() {
  const { modules } = useModulesContext();

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ModulesList modules={modules} />
        </Grid>
        <Grid item xs={4}>
          <ModulesList modules={modules} />
        </Grid>
        <Grid item xs={4}>
          <AddModule />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Modules;
