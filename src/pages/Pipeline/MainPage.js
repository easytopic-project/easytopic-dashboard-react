import React, { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useGlobalContext } from '../../contexts/GlobalContext';
import API from '../../api/API';


const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  results : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50%",
    marginTop: theme.spacing(10),
  },
}));

export default function MainPage() {

  const classes = useStyle();
  const { setRunning, running, processData, setProcessData } = useGlobalContext();

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
      {!running && !processData.response ? <Typography>Envie o arquivo em que deseja aplicar o OCR</Typography> : null }
      {running ? <Typography>Loading...</Typography> : null}
      {processData.response ? <Typography>{processData.response.ocr}</Typography> : null }
      </div>
    </div>
  );
}
