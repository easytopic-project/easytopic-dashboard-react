import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

export default function MainPage() {

  const classes = useStyle();

  return (
    <div className={classes.root}>
      
    </div>
  );
}
