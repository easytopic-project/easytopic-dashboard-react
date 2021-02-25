import React, { useState, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@material-ui/core'
import MainForm from '../../components/MainForm';
import API from '../../api/API';
import { useGlobalContext } from '../../contexts/GlobalContext';

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

  const { pipeline, setPipeline } = useGlobalContext();
  const [options, setOptions] = useState([]);
  
  function handleSelectChange(event) {
    setPipeline(event.target.value);
  };

  useEffect(() => {
    API.getPipelines().then((res) => setOptions(res.data));
  },[]);

  return (
    <div className={classes.root}>
      {console.log(options)}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="pipeline-select-label">Pipeline</InputLabel>
        <Select
          labelId="pipeline-select-label"
          id="pipeline-select"
          value={pipeline}
          onChange={handleSelectChange}
          label="Pipeline"
        >
          {options.map((option) => 
            <MenuItem key={option.id} value={option}>{option.name}</MenuItem>
          )}

        </Select>
      </FormControl>

      <MainForm pipeline={pipeline} />

    </div>
  );
}
