import { Box, Grid } from "@material-ui/core";

import React, { useState } from "react";
import AddModule from "../components/AddModule";
import ModulesList from "../components/ModulesList";
import { useLoginContext } from "../contexts/LoginContext";
import { useModulesContext } from "../contexts/ModulesContext";

function Modules() {
  const { modules } = useModulesContext();
  const { admin } = useLoginContext();
  if (!modules) return null;

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ModulesList
            title={"Modules Running"}
            modules={modules.filter(
              (module) => module.containerInfo.State === "running"
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <ModulesList
            title={"Modules Stopped"}
            modules={modules.filter(
              (module) => module.containerInfo.State === "exited"
            )}
          />
        </Grid>
        {admin ? (
          <Grid item xs={4}>
            <AddModule />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Modules;
