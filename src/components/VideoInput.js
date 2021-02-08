import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography } from "@material-ui/core";
import TheatersIcon from '@material-ui/icons/Theaters';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    minWidth: "200px",
    display: "flex",
    justifyContent: "space-between",
  },
  checkOn : {
    color: theme.palette.success.main,
  },
  checkOff : {

  },
}));

export default function VideoInput({ children, onChange, id }) {

  const classes = useStyles();

  const [filled, setFilled] = useState(false);

  function handleInside(event) {
    setFilled(true);
    onChange(event);
  }

  return (
    <>
      <input accept="video/*" className={classes.input} id={id} type="file" onChange={handleInside}/>
      <label htmlFor={id}>
        <Button className={classes.button} color="primary" aria-label="upload video" component="span" variant="contained">
          <TheatersIcon />
          {children}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
      </label>
    </>
  );
}
