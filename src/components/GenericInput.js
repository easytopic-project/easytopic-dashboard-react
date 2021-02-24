import React, { useState } from "react";
import { makeStyles, IconButton, Button, Typography } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import API from '../api/API'

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
    minWidth: "100px",
    display: "flex",
    justifyContent: "space-between",
  },
  checkOn : {
    color: theme.palette.success.main,
  },
  checkOff : {

  },
}));

export default function GenericInput({ children, id, onChange, type }) {

  const classes = useStyles();

  const [filled, setFilled] = useState(false);
  const [file, setFile] = useState();

  function handleInside(event) {
    setFilled(true);
    const fd = new FormData();
    fd.append('image', event.target.files[0], event.target.files[0].name);

    API.postFile(fd).then(res => {
      console.log(res);
      setFile(res.data.image); // possivelmente trocar "imagem" se hover correção no backend
    });
  }

  function deleteFile() {
    console.log(file);
    API.deleteFile(file).then(() => {
      setFile(null);
      setFilled(false)
    })
  }

  function selectLogo() {
    switch (type) {
      case "image":
        return <ImageIcon />
      default:
        return <AttachFileIcon />
    }
  }

  return (
    <>
    <div className={classes.root}>
      <input accept="*" className={classes.input} id={id} type="file" onChange={handleInside}/>
      <label htmlFor={id}>
        <Button className={classes.button} color="primary" aria-label="upload video" component="span" variant="contained">
          {selectLogo()}
          {children}
          <CheckCircleIcon className={filled ? classes.checkOn : classes.checkOff}/>
        </Button>
      </label>
      <IconButton color="primary" disabled={!filled} onClick={deleteFile}>
        <DeleteIcon />
      </IconButton>
      </div>
    </>
  );
}
