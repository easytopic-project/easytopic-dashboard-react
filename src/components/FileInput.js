import React, { useState, useEffect, useRef, useMemo } from "react";
import { makeStyles, Button, ButtonGroup, Tooltip, Typography } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image'; //image
import VideoIcon from '@material-ui/icons/Theaters'; //video
import TextIcon from '@material-ui/icons/Description'; //text
import SlideIcon from '@material-ui/icons/BurstMode'; //slide
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import API from '../api/API'
import { useGlobalContext } from '../contexts/GlobalContext';
import { FilePreview } from ".";


const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  input: {
    display: "none",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(),
  },
  buttonGroup: {
    width: "100%",
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  checkOn : {
    color: theme.palette.success.main,
  },
}));

function selectLogo(type) {
  switch (type) {
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

export default function FileInput({ field, inputObj, setinputObj }) {

  const classes = useStyles();

  const logo = useMemo(() => selectLogo(field.accept.toString().split("/")[0]), [field.id]);

  //const {inputObj, setinputObj} = useGlobalContext();

  const [file, setFile] = useState();
  const fileRef = useRef();
  const [inputKey, setInputKey] = useState(0);
  const [filePreview, setFilePreview] = useState();

  function handleInputChange(event) {
    setFilePreview(event.target.files[0]);

    if (file) {
      API.deleteFile(file);
    }
      
    const fd = new FormData();
    fd.append('file', event.target.files[0], event.target.files[0].name);

    API.postFile(fd).then(res => {
      setFile(res.data.file);
      setinputObj({...inputObj, [field.id]: res.data.file})
    });
  }

  function deleteFile() {
    API.deleteFile(file).then((res) => {
      setFile(null);
      });
    setInputKey(inputKey + 1);
    setFilePreview(null);
  }

  // useEffect(() => {
  //   fileRef.current = file;
  // }, [file]);

  // useEffect(() => {
  //   return () => {
  //     fileRef.current && API.deleteFile(fileRef.current);
  //   }
  // }, []);

  return (
    <div className={classes.root}>
      <input
        key={inputKey}
        required={field.required}
        accept={field.accept.toString()}
        className={classes.input}
        id={field.id}
        type="file"
        onChange={handleInputChange}
      />
      <div className={classes.titleDiv}>
        <label htmlFor={field.id}>
          <Typography>{field.required ? "* " + field.name + ":" : field.name + ":"}</Typography>
        </label>
        <Tooltip title={field.description}>
          <HelpOutlineIcon fontSize="small" />
        </Tooltip>
      </div>
      <label htmlFor={field.id}>
        <ButtonGroup
          className={classes.buttonGroup}
          color="primary"
          variant="contained"
        >
          <Button
            className={classes.button}
            color="primary"
            aria-label="upload file"
            component="span"
            variant="contained"
          >
            {logo}
            {field.name}
            <CheckCircleIcon className={file ? classes.checkOn : null} />
          </Button>

          <Button color="primary" disabled={!file} onClick={deleteFile}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </label>
      <FilePreview type={field.accept.toString().split("/")[0]} file={filePreview} />
    </div>
  );
}
