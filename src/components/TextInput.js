import React from "react";
import { TextField, Tooltip, Typography, makeStyles } from "@material-ui/core";
import { useGlobalContext } from '../contexts/GlobalContext';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(),
  },
}));

export default function TextInput({ field }) {

  const classes = useStyles();

  const {inputObj, setinputObj} = useGlobalContext();

  function handleInputChange(event) {
    setinputObj({...inputObj, [field.id]: event.target.value})
  }

  return (
    <div className={classes.root}>
       <div className={classes.titleDiv}>
        <label htmlFor={field.id}>
          <Typography>{field.name + ":"}</Typography>
        </label>
        <Tooltip title={field.description}>
          <HelpOutlineIcon fontSize="small" />
        </Tooltip>
      </div>
      <TextField
          id={field.id}
          //label={field.name}
          placeholder={field.name}
          multiline
          variant="outlined"
          onChange={handleInputChange}
          required={field.required}
        />       
    </div>
  );
}
