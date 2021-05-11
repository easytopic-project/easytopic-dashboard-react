import React, { useState, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem,  } from '@material-ui/core'
import MainForm from '../../components/MainForm';
import API from '../../api/API';
import { useGlobalContext } from '../../contexts/GlobalContext';

const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  formControl: {
    marginTop: theme.spacing(5),
    width: "50%",
  }
}));

export default function PipelineAside() {

  const classes = useStyle();

  const { pipeline, setPipeline } = useGlobalContext();
  const [pipelineOptions, setPipelineOptions] = useState([]);

  useEffect(() => {
    API.getPipelines().then((res) => setPipelineOptions(res.data));
  },[]);

  function handleSelectChange(event) {
    setPipeline(event.target.value);
  };

  return (
    <div className={classes.root}>
      <MainForm />
    </div>
  );
}
