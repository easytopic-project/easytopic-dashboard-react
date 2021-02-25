import React, { useState } from "react";
import { makeStyles, IconButton, Button, ButtonGroup, Typography, Tooltip } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image'; //image
import VideoIcon from '@material-ui/icons/Theaters'; //video
import TextIcon from '@material-ui/icons/Description'; //text
import SlideIcon from '@material-ui/icons/BurstMode'; //slide
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import API from '../api/API'
import { useGlobalContext } from '../contexts/GlobalContext';

// tentar implementar input generico 

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
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

export default function GenericInput({ field }) {

  const classes = useStyles();

  const {inputObj, setinputObj} = useGlobalContext();

  const [filled, setFilled] = useState(false);
  const [file, setFile] = useState();

  function handleInputChange(event) {
    if (filled)
      deleteFile();
    else
      setFilled(true);

    const fd = new FormData();
    fd.append('file', event.target.files[0], event.target.files[0].name);

    API.postFile(fd).then(res => {
      console.log(res);
      setFile(res.data.file);
      setinputObj({...inputObj, [field.id]: res.data.file})
    });
  }

  function deleteFile() {
    console.log(file);
    API.deleteFile(file).then((res) => {
      setFile(null);
      setFilled(false)
      console.log(res);
    })
  }
  console.log(field);

  function selectLogo() {
    switch (field.id) {
      case "image":
        return <ImageIcon />
      case "video":
        return <VideoIcon />
      case "text":
        return <TextIcon />
      case "slide":
        return <SlideIcon />
      default:
        return <AttachFileIcon />
    }
  }
  const logo = selectLogo();
  
  function getAccept() {
    if (Array.isArray(field.accept))
      return field.accept.toString()
    return field.accept
  }
  const accept = getAccept();

  return (
    <>
    <div className={classes.root}>
      <input required={field.required} accept={accept} className={classes.input} id={field.id} type="file" onChange={handleInputChange}/>
      <label htmlFor={field.id}>
        
        <ButtonGroup color="primary" variant="contained">
        <Tooltip title={field.description}>
        <Button className={classes.button} color="primary" aria-label="upload file" component="span" variant="contained">
          {logo}
          {field.name}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
        </Tooltip> 
        <Button color="primary" disabled={!filled} onClick={deleteFile}>
        <DeleteIcon />
        </Button>
        </ButtonGroup>
             
      </label>
      </div>
    </>
  );
}
