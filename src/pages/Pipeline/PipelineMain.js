import React, { useEffect } from 'react'
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core'
import { useGlobalContext } from '../../contexts/GlobalContext';
import API from '../../api/API';


const useStyle = makeStyles((theme) => ({
  root: {
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

export default function PipelineMain({ match: { params: { id } } }) {

  const classes = useStyle();
  const { setRunning, running, processData, setProcessData, pipeline, setPipeline, pipelineOptions } = useGlobalContext();

  useEffect(() => {
    if (!processData || processData.status !== "done") {
      API.getJob(id).then(res => {
        setProcessData(res.data);
        setPipeline(pipelineOptions.find((pipeline) => pipeline.id === res.data.type));
        console.log("setpipeline");
        console.log(res.data);
      }); 
    }
  },[processData]);

  return (
    <div className={classes.root}>
      <div className={classes.results}>
      {/* {(!running && !processData.response) ? <Typography variant="h4">{pipeline.description}</Typography> : null } */}
      {!processData || processData.status !== "done" ? <Typography variant="h4">Loading...</Typography> : null}
      {processData.output && pipeline ? pipeline.output.map((value, i) => {
        return (
          <Card className={classes.resultCard} key={value.id}>
            <CardContent>
            <Typography variant="h4">{value.name}</Typography>
            <Typography variant="h5">{value.description}</Typography>
            <Typography component="pre">{processData.output[value.id]}</Typography>
            </CardContent>
          </Card>
        );
      }) : null }
      </div>
    </div>
  );
}
