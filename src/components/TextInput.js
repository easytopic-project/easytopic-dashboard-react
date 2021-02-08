import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography } from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';
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

export default function TextInput({ children, onChange, id }) {

  const classes = useStyles();

  const [filled, setFilled] = useState(false);

  function handleInside(event) {
    setFilled(true);
    onChange(event);
  }

  return (
    <>
      <input accept=".txt, .srt, .doc" className={classes.input} id={id} type="file" onChange={handleInside}/>
      <label htmlFor={id}>
        <Button className={classes.button} color="primary" aria-label="upload text" component="span" variant="contained">
          <DescriptionIcon />
          {children}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
      </label>
    </>
  );
}
