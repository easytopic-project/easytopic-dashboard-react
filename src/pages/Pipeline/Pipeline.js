import { Divider, Grid, makeStyles } from '@material-ui/core'
import React from 'react';
import PipelineAside from './PipelineAside';
import PipelineMain from './PipelineMain';

const useStyle = makeStyles((theme) => ({
  root: {

  },
  container: {
    height: "100vh",
  },
}));

export default function Pipeline() {

  const classes = useStyle();

  return (
      <Grid container direction="row" className={classes.container}>
        <Grid item xs={4} >
          <PipelineAside />
        </Grid>
        <Grid item >
          <Divider orientation="vertical"/>
        </Grid>
        <Grid item xs>
          <PipelineMain />
        </Grid>
      </Grid>
  );
}
