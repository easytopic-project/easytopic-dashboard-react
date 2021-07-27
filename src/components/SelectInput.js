import {
  makeStyles,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import React from "react";

// TODO remover repetição de código nos inputs
const useStyles = makeStyles((theme) => ({
  root: {
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

function SelectInput({ field, inputObj, setinputObj }) {
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
      <Select
        {...field}
        value={inputObj[field.id] ? inputObj[field.id] : ""}
        onChange={handleInputChange}
      >
        {field.options &&
          field.options instanceof Object &&
          Object.entries(field.options).map((option) => (
            <MenuItem key={option[0]} value={option[0]}>
              {option[1]}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
}

export default SelectInput;
