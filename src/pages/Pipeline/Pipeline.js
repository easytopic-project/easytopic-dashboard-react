import { Divider, Grid, makeStyles } from '@material-ui/core'
import React from 'react';
import Aside from './Aside';
import MainPage from './MainPage';

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
          <Aside />
        </Grid>
        <Grid item>
          <Divider orientation="vertical" item xs={1}/>
        </Grid>
        <Grid item xs>
          <MainPage />
        </Grid>
      </Grid>
  );
}
