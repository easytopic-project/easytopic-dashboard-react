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

export default function MainForm(props) {

  const classes = useStyles();
  const {setRunning, processData, setProcessData} = useGlobalContext();

  const [video, setVideo] = useState();
  const [text, setText] = useState();
  const [slide, setSlide] = useState();
  const [image, setImage] = useState();


  function onSubmit(event) {

    console.log(event.target);
    event.preventDefault();

    API.postOcrJob(image).then((res) => {
      setRunning(true);
      setProcessData(res.data);
      console.log(res.data);
    });
  }

  function handleVideoChange(event) {
    setVideo(event.target.files[0]);
  };

  function handleTextChange(event) {
    setText(event.target.files[0]);
  };

  function handleSlideChange(event) {
    setSlide(event.target.files[0]);
  };

  function handleImageChange(event) {
    const file = new FormData();
    file.append('image', event.target.files[0], event.target.files[0].name);

    API.postFile(file).then(res => {
      console.log(res.data.image);
      setImage(res.data.image);
    });
  };

  return (
    <form id="main-form" onSubmit={onSubmit} className={classes.form}>
      {/*<VideoInput id="video-file" onChange={handleVideoChange}>Vídeo</VideoInput>
      <TextInput id="text-file" onChange={handleTextChange}>Texto</TextInput>
  <SlideInput id="slide-file" onChange={handleSlideChange}>Slide</SlideInput>*/}

      <ImageInput image={image} id="slide-file" onChange={handleImageChange}>Imagem</ImageInput>
      <GenericInput icon="AttachFileIcon" id="generic" onChange={() => { alert("generic") }}>Genérico</GenericInput>
      
      <Button type="submit" form="main-form" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  )
}
