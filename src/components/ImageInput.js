import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
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

export default function ImageInput({ children, onChange, id, image }) {

  const classes = useStyles();

  const [filled, setFilled] = useState(false);

  function handleInside(event) {
    setFilled(true);
    onChange(event);
  }

  return (
    <>
      <input accept="image/*" className={classes.input} id={id} type="file" onChange={handleInside}/>
      <label htmlFor={id}>
        <Button className={classes.button} color="primary" aria-label="upload image" component="span" variant="contained">
          <ImageIcon />
          {children}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
      </label>
    </>
  );
}
