import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import API from "../api/API";

const useStyle = makeStyles((theme) => ({
  resultCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  divider: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  downloadIcon: {
    marginRight: theme.spacing(),
  },
  mediaPreview: {
    maxWidth: "640px",
    marginBottom: theme.spacing(2),
  },
  container: {},
}));

function JobResults({ jobData, pipeline }) {
  const [downloadArray, setDownloadArray] = useState([]);
  const classes = useStyle();

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
    <Card className={classes.container}>
      <CardContent>
        <Typography variant="h4" align="center">
          Results
        </Typography>
        <Divider className={classes.divider} />
        <Box overflow="auto">
          {jobData &&
          jobData.status == "done" &&
          jobData.data &&
          pipeline &&
          pipeline.id == jobData.type
            ? pipeline.output.map((value, i) => {
                let cardData = {};
                if (value.from) {
                  console.log(value);
                  const stringSplit = value.from.split(":");
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
                        <Typography variant="h5">{value.name}</Typography>
                        <Typography variant="h6">
                          {value.description}
                        </Typography>
                        <Divider className={classes.divider} />

                        {cardData.mimetype.split("/")[0] == "video" ? (
                          <div className={classes.mediaPreview}>
                            <video
                              src={API.getFileLink(cardData.name)}
                              width="100%"
                              controls
                            />
                          </div>
                        ) : cardData.mimetype.split("/")[0] == "image" ? (
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
                            downloadFile(cardData.name, cardData.mimetype)
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
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobResults;