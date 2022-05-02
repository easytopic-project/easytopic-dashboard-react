import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import API from "../api/API";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
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
  checkOn: {
    color: theme.palette.success.main,
  },
}));

function AddModule() {

  const classes = useStyles();

  const [build, setBuild] = useState("");
  const [file, setFile] = useState();

  function handleBuildChange(event) {
    setBuild(event.target.value);
  }

  function handleButton() {
    API.postModule(build, file).then((res) => console.log(res));
  }

  function handleConfigChange(event) {
    if (file) {
      API.deleteFile(file);
    }

    const fd = new FormData();
    fd.append("file", event.target.files[0], event.target.files[0].name);

    API.postFile(fd).then((res) => {
      setFile(res.data.file);
    });
  }

  function deleteFile() {
    API.deleteFile(file).then((res) => {
      setFile(null);
    });
    //setInputKey(inputKey + 1);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      margin={5}
      sx={{
        "& > *": {
          marginTop: 30,
          marginBottom: 30,
        },
      }}
    >
      <Typography variant="h3"> New Module </Typography>
      <TextField
        id="build"
        label="Build"
        value={build}
        fullWidth
        onChange={handleBuildChange}
      />

      <input
        accept="json"
        id="config"
        className={classes.input}
        type="file"
        onChange={handleConfigChange}
      />
      <label htmlFor="config">
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
            Config JSON
            <CheckCircleIcon className={file ? classes.checkOn : null} />
          </Button>

          <Button color="primary" disabled={!file} onClick={deleteFile}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </label>
      <Button variant="contained" color="primary" onClick={handleButton}>
        Add module
      </Button>
    </Box>
  );
}

export default AddModule;
