import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import Status from "./Status";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  statusContainer: {
    marginTop: theme.spacing(1),
  },
}));

function JobHeader({ jobData, pipeline }) {
  const classes = useStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={8}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                {pipeline ? (
                  <Typography variant="h4">{pipeline.name}</Typography>
                ) : (
                  <Skeleton width="150px" height="50px" />
                )}
              </Grid>
              <Grid item>
                {pipeline ? (
                  <Typography variant="subtitle1">
                    {pipeline.description}
                  </Typography>
                ) : (
                  <Skeleton width="150px" />
                )}
              </Grid>
            </Grid>
            {pipeline ? (
              <Typography>{`Version: ${pipeline.version}`}</Typography>
            ) : (
              <Skeleton width="80px" />
            )}
            {jobData ? (
              <Grid container className={classes.statusContainer} spacing={1}>
                <Grid item>
                  <Typography display="inline" variant="h6">
                    Status:
                  </Typography>
                </Grid>
                <Grid item>
                  <Status color={jobData.status}>
                    <Typography>{jobData.status.toUpperCase()}</Typography>
                  </Status>
                </Grid>
              </Grid>
            ) : (
              <Skeleton width="100px" />
            )}
          </Grid>
          <Grid item>
            {jobData ? <Typography variant="h4">{`#${jobData.id}`}</Typography> : <Skeleton width="50px" height="50px" />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default JobHeader;
