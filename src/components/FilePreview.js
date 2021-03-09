import React, { useState } from 'react'
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  img: {
    width: "100%", 
    borderRadius: "5px",
    marginTop: theme.spacing(),
    border: "2px solid",
    borderColor: theme.palette.primary.main,
  },
}));

function FilePreview({ type, file=null }) {

  const classes = useStyle();
  const [imageSrc, setImageSrc] = useState();

  if (file && type === "image") {
    const reader = new FileReader();
    reader.onload = function() {
      setImageSrc(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      {  file ? (imageSrc ? <><img className={classes.img} src={imageSrc} /><Typography>{file.name}</Typography></> : <p>{file.name}</p>) : null }
    </div>
  )
}

export default FilePreview
