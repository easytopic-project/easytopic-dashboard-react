import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography } from "@material-ui/core";
import BurstModeIcon from '@material-ui/icons/BurstMode';
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

export default function SlideInput({ children, onChange, id }) {

  const classes = useStyles();

  const [filled, setFilled] = useState(false);

  function handleInside() {
    setFilled(true);
    onChange();
  }

  return (
    <>
      <input accept=".pptx, .pdf" className={classes.input} id={id} type="file" onChange={handleInside}/>
      <label htmlFor={id}>
        <Button className={classes.button} color="primary" aria-label="upload slide" component="span" variant="contained">
          <BurstModeIcon />
          {children}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
      </label>
    </>
  );
}
