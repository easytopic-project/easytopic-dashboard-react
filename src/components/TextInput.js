import React from "react";
import { TextField, Tooltip, Typography, makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(),
  },
}));

export default function TextInput({ field, inputObj, setinputObj }) {
  const classes = useStyles();

  function handleInputChange(event) {
    setinputObj({ ...inputObj, [field.id]: event.target.value });
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <label htmlFor={field.id}>
          <Typography>
            {field.required ? "* " + field.name + ":" : field.name + ":"}
          </Typography>
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
