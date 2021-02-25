import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography, TextField, Tooltip } from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useGlobalContext } from '../contexts/GlobalContext';

const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
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

export default function TextInput({ field }) {

  const classes = useStyles();

  const {inputObj, setinputObj} = useGlobalContext();

  function handleInputChange(event) {
    setinputObj({...inputObj, [field.id]: event.target.value})
  }

  return (
    <>
      <Tooltip title={field.description}>
      <TextField
          id={field.id}
          label={field.name}
          placeholder={field.name}
          multiline
          variant="outlined"
          onChange={handleInputChange}
          required={field.required}
        />
      </Tooltip>
        
    </>
  );
}
