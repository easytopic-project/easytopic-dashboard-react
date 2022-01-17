import { Button, Card, CardContent, Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import API from "../api/API";
import InfoIcon from "@material-ui/icons/Info";

function ModuleCard({ module }) {
  function handleStopButton(id) {
    API.stopModule(id).then((res) => console.log(res));
  }

  function handleStartButton(id) {
    API.startModule(id).then((res) => console.log(res));
  }

  return (
    <Card raised>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h4">{module.name}</Typography>
            <Typography>Description: {module.description}</Typography>
            <Typography>Author: {module.author}</Typography>
            <Typography>E-mail: {module.email}</Typography>
            {/* <Typography>{date.toString()}</Typography> */}
            {/* <Typography>Input queue: {module.input_queue}</Typography>
            <Typography>Output queue: {module.input_queue}</Typography> */}
            <Typography>State: {module.containerInfo.State}</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              justifyContent="space-between"
              style={{ height: "100%" }}
            >
              <Grid item>
                <IconButton
                  aria-label="info"
                  onClick={() => alert("implement")}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
              <Grid item>
                {module.containerInfo.State === "running" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStopButton(module.id)}
                  >
                    Stop module
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartButton(module.id)}
                  >
                    Start module
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ModuleCard;
