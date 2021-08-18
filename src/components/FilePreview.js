import React, { useState } from "react";
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

function FilePreview({ type, file = null }) {
  const classes = useStyle();
  const [fileSrc, setFileSrc] = useState();

  if (type === ".jpg") {
    type = "image";
  }

  if (file && (type === "image" || type === "video")) {
    const reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      {file ? (
        fileSrc ? (
          type === "image" ? (
            <>
              <img
                className={classes.img}
                src={fileSrc}
                alt={`preview of ${file.name}`}
              />
              <Typography>{file.name}</Typography>
            </>
          ) : type === "video" ? (
            <>
              <video className={classes.img} src={fileSrc} controls />
              <Typography>{file.name}</Typography>
            </>
          ) : null
        ) : (
          <Typography>{file.name}</Typography>
        )
      ) : null}
    </div>
  );
}

export default FilePreview;
