import { Card, CardContent, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";
import Status from "./Status";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  statusContainer: {
    marginTop: theme.spacing(2)
  },
}));

function JobHeader() {

  const classes = useStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between" >
          <Grid item xs={8}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item >
                <Typography variant="h4">ORC-JPG</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Runs ocr on jpg files
                </Typography>
              </Grid>
            </Grid>
            <Typography>version 1.0</Typography>
            <Grid container className={classes.statusContainer} spacing={1}>
              <Grid item>
                <Typography display="inline" variant="h6">
                  Status:{""}
                </Typography>
              </Grid>
              <Grid item>
                <Status color={"done"}>
                  DONE
                </Status>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4">#23</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default JobHeader;
