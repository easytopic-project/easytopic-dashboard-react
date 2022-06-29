import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import API from "../api/API";
import InfoIcon from "@material-ui/icons/Info";
import { useLoginContext } from "../contexts/LoginContext";

function ModuleCard({ module }) {
  const { admin } = useLoginContext();

  function handleStopButton(id) {
    API.stopModule(id);
  }

  function handleStartButton(id) {
    API.startModule(id);
  }

  return (
    <Box marginBottom={2}>
      <Card raised>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item xs={8}>
              <Typography variant="h4">{module.name}</Typography>
              <Typography>Description: {module.description}</Typography>
              <Typography>Author: {module.author}</Typography>
              <Typography>E-mail: {module.email}</Typography>
              {/* <Typography>{date.toString()}</Typography> */}
              {/* <Typography>Input queue: {module.input_queue}</Typography>
            <Typography>Output queue: {module.input_queue}</Typography> */}
              <Typography>
                State: {module.containerInfo.State.toUpperCase()}
              </Typography>
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
                  {admin ? (
                    module.containerInfo.State === "running" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStopButton(module.id)}
                        style={{ backgroundColor: "red", fontWeight: "bold" }}
                      >
                        Stop
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartButton(module.id)}
                        style={{ backgroundColor: "green", fontWeight: "bold" }}
                      >
                        Start
                      </Button>
                    )
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ModuleCard;
