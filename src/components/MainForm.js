import { TextField, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { VideoInput, TextInput, SlideInput } from '.';

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

export default function MainForm() {

  const classes = useStyles();

  const [video, setVideo] = useState();
  const [text, setText] = useState();
  const [slide, setSlide] = useState();


  function onSubmit(event) {
    console.log(event.target);
    event.preventDefault();
  };

  function handleVideoChange(event) {
    setVideo(event.target.files[0]);
    console.log(event.target);
  };

  return (
    <form id="main-form" onSubmit={onSubmit} className={classes.form}>
      <VideoInput id="video-file" onChange={handleVideoChange}>Vídeo</VideoInput >
      <TextInput onChange={()=> console.log("text works")} id="text-file" >Texto</TextInput>
      <SlideInput onChange={()=> console.log("slide works")} id="slide-file">Slide</SlideInput>      
      
      <Button type="submit" form="main-form" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  )
}
