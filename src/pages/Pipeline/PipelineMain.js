import React, { useEffect } from 'react'
import { makeStyles, Typography, Box, Card, CardContent } from '@material-ui/core'
import { useGlobalContext } from '../../contexts/GlobalContext';
import API from '../../api/API';


const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  results : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: theme.spacing(5),
  },
  resultCard: {
    marginBottom : theme.spacing(3),
  }
}));

export default function PipelineMain() {

  const classes = useStyle();
  const { setRunning, running, processData, setProcessData, pipeline } = useGlobalContext();

  useEffect(() => {
    if (running && processData.status !== "done") {
      API.getOcrJob(processData.id).then(res => {
        setProcessData(res.data);
        if (res.data.response)
          setRunning(false);
      }); 
    }
  },[processData]);

  return (
    <div className={classes.root}>
      <div className={classes.results}>
      {(!running && !processData.response) ? <Typography variant="h4">{pipeline.description}</Typography> : null }
      {running ? <Typography variant="h4">Loading...</Typography> : null}
      {processData.output ? pipeline.output.map((value, i) => {
        return (
          <Card className={classes.resultCard} key={value.id}>
            <CardContent>
            <Typography variant="h4">{value.name}</Typography>
            <Typography variant="h5">{value.description}</Typography>
            <Typography>{processData.output[value.id]}</Typography>
            </CardContent>
          </Card>
        );
      }) : null }
      </div>
    </div>
  );
}
