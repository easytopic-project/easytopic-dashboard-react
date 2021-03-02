import { TextField, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { VideoInput, TextInput, SlideInput, ImageInput, GenericInput } from '.';
import API from '../api/API';
import { useGlobalContext } from '../contexts/GlobalContext';


const useStyles = makeStyles((theme) => ({
  form : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50%",
    marginTop: theme.spacing(10),
  },

}));

export default function MainForm({pipeline}) {

  const classes = useStyles();
  const {setRunning, processData, setProcessData, inputObj} = useGlobalContext();

  function onSubmit(event) {

    console.log(event.target);
    event.preventDefault();

    API.postOcrJob(inputObj, pipeline.id).then((res) => {
      setRunning(true);
      setProcessData(res.data);
      console.log(res.data);
    });
  }

  return (
    <form id="main-form" onSubmit={onSubmit} className={classes.form}>
      
      {pipeline.input && pipeline.input.map((field, i) => {
        if (field.type == "file")
          return <GenericInput key={field.id} field={field} />
        if (field.type == "text")
          return <TextInput key={field.id} field={field} />
      })}
      
      <Button type="submit" form="main-form" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  )
}
