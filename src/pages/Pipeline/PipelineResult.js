import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CardMedia,
} from "@material-ui/core";
import { useGlobalContext } from "../../contexts/GlobalContext";
import API from "../../api/API";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {},
  results: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: theme.spacing(5),
  },
  resultCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  divider: {
    margin: theme.spacing(3),
  },
  downloadIcon: {
    marginRight: theme.spacing(),
  },
  mediaPreview: {
    maxWidth: "640px",
    marginBottom: theme.spacing(2),
  },
}));

export default function PipelineResult({
  match: {
    params: { id },
  },
}) {
  const classes = useStyle();
  const {
    setRunning,
    running,
    processData,
    setProcessData,
    pipeline,
    setPipeline,
    pipelineOptions,
  } = useGlobalContext();
  const [jobData, setJobData] = useState({});
  const [downloadArray, setDownloadArray] = useState([]);

  useEffect(() => {
    if (!jobData || jobData.status !== "done") {
      API.getJob(id).then((res) => {
        setJobData(res.data);
        pipelineOptions.map((pipeline) => console.log(pipeline.id));
        console.log(res.data.type);
        setPipeline(
          pipelineOptions.find((pipeline) => pipeline.id === res.data.type)
        );
        console.log("setpipeline");
        console.log(res.data);
      });
    }
  }, [jobData]);

  function downloadText(text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    downloadArray.push(url);
    console.log(url);
    return url;
  }

  function downloadFile(file, type) {
    axios.get(API.getFileLink(file), { responseType: "blob" }).then((res) => {
      console.log(res.data);
      const url = window.URL.createObjectURL(res.data);
      console.log(url);
      downloadArray.push(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.results}>
        {/* {(!running && !processData.response) ? <Typography variant="h4">{pipeline.description}</Typography> : null } */}
        {!jobData || jobData.status !== "done" ? (
          <Typography variant="h4">Loading...</Typography>
        ) : null}
        {jobData.status=="done" && jobData.data && pipeline && pipeline.id == jobData.type
          ? pipeline.output.map((value, i) => {
              console.log(pipeline);
              let cardData = {};
              if (value.from) {
                console.log(value);
                const stringSplit = value.from.split(':');
                console.log(stringSplit);
                cardData = jobData.data[stringSplit[0]][stringSplit[1]];
              } else {
                cardData =
                  jobData.data[
                    Object.keys(jobData.data).find(
                      (key) => jobData.data[key][value.id]
                    )
                  ][value.id];
              }
              if (value.type == "file")
                return (
                  <Card className={classes.resultCard} key={value.id}>
                    <CardContent>
                      <Typography variant="h4">{value.name}</Typography>
                      <Typography variant="h5">{value.description}</Typography>
                      <Divider className={classes.divider} />

                      {cardData.mimetype.split("/")[0] ==
                      "video" ? (
                        <div className={classes.mediaPreview}>
                          <video
                            src={API.getFileLink(cardData.name)}
                            type={cardData.mimetype}
                            width="100%"
                            controls
                          />
                        </div>
                      ) : cardData.mimetype.split("/")[0] ==
                        "image" ? (
                        <div className={classes.mediaPreview}>
                          <img
                            src={API.getFileLink(cardData.name)}
                            width="100%"
                          />
                        </div>
                      ) : null}

                      <Button
                        variant="contained"
                        onClick={() =>
                          downloadFile(
                            cardData.name,
                            cardData.mimetype
                          )
                        }
                      >
                        <GetAppIcon className={classes.downloadIcon} />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                );
              return (
                <Card className={classes.resultCard} key={value.id}>
                  <CardContent>
                    <Typography variant="h4">{value.name}</Typography>
                    <Typography variant="h5">{value.description}</Typography>
                    <Divider className={classes.divider} />
                    <Typography component="pre">{cardData}</Typography>
                    <Button
                      variant="contained"
                      href={downloadText(cardData)}
                      download={`${value.name}.txt`}
                    >
                      <GetAppIcon className={classes.downloadIcon} />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );
}
