import React, { useState } from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@material-ui/core'
import MainForm from '../../components/MainForm';

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  formControl: {
    marginTop: theme.spacing(5),
    width: "50%",
  }
}));

export default function Aside() {

  const classes = useStyle();

  const [pipeline, setPipeline] = useState(1);

  // Checar pipelines disponiveis e exibir condicionalmente passando como props para MainForm
  
  function handleSelectChange(event) {
    setPipeline(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="pipeline-select-label">Pipeline</InputLabel>
        <Select
          labelId="pipeline-select-label"
          id="pipeline-select"
          value={pipeline}
          onChange={handleSelectChange}
          label="Pipeline"
        >
          <MenuItem value={1}>Pipeline #1</MenuItem>
          <MenuItem value={2}>Pipeline #2</MenuItem>
          <MenuItem value={3}>Pipeline #3</MenuItem>
        </Select>
      </FormControl>

      <MainForm />

    </div>
  );
}
