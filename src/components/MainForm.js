import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { TextInput, FileInput, GenericInput } from '.';
import API from '../api/API';
import { useGlobalContext } from '../contexts/GlobalContext';


const useStyles = makeStyles((theme) => ({
  form : {
    "& > *": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    height: "50%",
    marginTop: theme.spacing(3),
  },

}));

export default function MainForm() {

  const classes = useStyles();
  const {setRunning, setProcessData, inputObj, setinputObj, pipeline} = useGlobalContext();
  const history = useHistory();

  function onSubmit(event) {

    event.preventDefault();

    API.postJob(inputObj, pipeline.id).then((res) => {
      setRunning(true);
      setProcessData(res.data);
      console.log(res.data);
      history.push(`/jobs/${res.data.id}`);
    });
  }

  if (pipeline) return (
    <form id="main-form" onSubmit={onSubmit} className={classes.form}>
      <div>
        <Typography variant="h4">{pipeline.id.toUpperCase()}</Typography>
        <Typography>{pipeline.description}</Typography>
      </div>
      {pipeline.input && pipeline.input.map((field, i) => {
        if (field.type === "file")
          return <FileInput key={pipeline.id+field.id} field={field} />
        if (field.type === "text")
          return <TextInput key={pipeline.id+field.id} field={field} /> 
          return <GenericInput key={pipeline.id+field.id} field={field} />
      })}
      
      <Button type="submit" form="main-form" variant="contained" color="primary">
        Send
      </Button>
    </form>
  )
  return null;
}
