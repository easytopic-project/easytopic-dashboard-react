import React from "react";
import { TextField, Tooltip, Typography, makeStyles } from "@material-ui/core";
import { useGlobalContext } from '../contexts/GlobalContext';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import API from "../api/API"

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

export default function GenericInput({ field, inputObj, setinputObj }) {

  const classes = useStyles();

  //const {inputObj, setinputObj} = useGlobalContext();

  function handleInputChange(event) {

    if (field.type === "file") {
      const fd = new FormData();
      fd.append('file', event.target.files[0], event.target.files[0].name);

      API.postFile(fd).then(res => {
        setinputObj({...inputObj, [field.id]: res.data.file})
      });
    }

    else setinputObj({...inputObj, [field.id]: event.target.value})
  }

  return (
    <div className={classes.root}>
       <div className={classes.titleDiv}>
        <label htmlFor={field.id}>
          <Typography>{field.required ? "* " + field.name + ":" : field.name + ":"}</Typography>
        </label>
        <Tooltip title={field.description}>
          <HelpOutlineIcon fontSize="small" />
        </Tooltip>
      </div>
      <input {...field} onChange={handleInputChange}></input>
    </div>
  );
}
