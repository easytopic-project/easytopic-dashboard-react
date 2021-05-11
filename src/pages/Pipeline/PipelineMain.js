import React, { useEffect, useState } from 'react'
import { makeStyles, Typography, Card, CardContent, Button, Divider } from '@material-ui/core'
import { useGlobalContext } from '../../contexts/GlobalContext';
import API from '../../api/API';
import GetAppIcon from '@material-ui/icons/GetApp';


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
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  divider: {
    margin: theme.spacing(3),
  },
  downloadIcon: {
    marginRight: theme.spacing(),
  },
}));

export default function PipelineMain({ match: { params: { id } } }) {

  const classes = useStyle();
  const { setRunning, running, processData, setProcessData, pipeline, setPipeline, pipelineOptions } = useGlobalContext();
  const [jobData, setJobData] = useState({});
  const [downloadArray, setDownloadArray] = useState([]);


  useEffect(() => {
    if (!jobData || jobData.status !== "done") {
      API.getJob(id).then(res => {
        setJobData(res.data);
        setPipeline(pipelineOptions.find((pipeline) => pipeline.id === res.data.type));
        console.log("setpipeline");
        console.log(res.data);
      }); 
    }
  },[jobData]);

  function downloadText(text) {
    const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    const url = window.URL.createObjectURL(blob);
    downloadArray.push(url);
    return url
  }

  return (
    <div className={classes.root}>
      <div className={classes.results}>
      {/* {(!running && !processData.response) ? <Typography variant="h4">{pipeline.description}</Typography> : null } */}
      {!jobData || jobData.status !== "done" ? <Typography variant="h4">Loading...</Typography> : null}
      {jobData.output && pipeline ? pipeline.output.map((value, i) => {
        return (
          <Card className={classes.resultCard} key={value.id}>
            <CardContent>
            <Typography variant="h4">{value.name}</Typography>
            <Typography variant="h5">{value.description}</Typography>
            <Divider className={classes.divider}/>
            <Typography component="pre">{jobData.output[value.id]}</Typography> 
            <Button variant="contained" href={downloadText(jobData.output[value.id])} download={`${value.name}.txt`}>
              <GetAppIcon className={classes.downloadIcon} />
              Download
            </Button>
            </CardContent>
          </Card>
        );
      }) : null }
      </div>
    </div>
  );
}
