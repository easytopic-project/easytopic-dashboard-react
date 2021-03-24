import { Divider, Grid, makeStyles } from '@material-ui/core'
import React , { useEffect } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import PipelineAside from './PipelineAside';
import PipelineMain from './PipelineMain';

const useStyle = makeStyles((theme) => ({
  container: {
    height: "90vh",
  },
}));

export default function Pipeline({ match: { params: { id } } }) {

  const classes = useStyle();
  const { pipelineOptions, setPipeline } = useGlobalContext();

  function selectPipeline(id) {
    setPipeline(pipelineOptions.find((pipeline) => pipeline.id === id));
  }

  useEffect(() => {
    selectPipeline(id);
  }, [id])

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
