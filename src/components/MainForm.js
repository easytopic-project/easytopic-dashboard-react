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

export default function MainForm(props) {

  const classes = useStyles();

  const [video, setVideo] = useState();
  const [text, setText] = useState();
  const [slide, setSlide] = useState();


  function onSubmit(event) {
    // usar FormData e usar a API para postar os arquivos
    console.log(event.target);
    event.preventDefault();
  };

  function handleVideoChange(event) {
    setVideo(event.target.files[0]);
  };

  function handleTextChange(event) {
    setText(event.target.files[0]);
  };

  function handleSlideChange(event) {
    setSlide(event.target.files[0]);
  };

  return (
    <form id="main-form" onSubmit={onSubmit} className={classes.form}>
      <VideoInput id="video-file" onChange={handleVideoChange}>Vídeo</VideoInput>
      <TextInput id="text-file" onChange={handleTextChange}>Texto</TextInput>
      <SlideInput id="slide-file" onChange={handleSlideChange}>Slide</SlideInput>      
      
      <Button type="submit" form="main-form" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  )
}
