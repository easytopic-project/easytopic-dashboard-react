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
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import API from "../api/API";

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.primary.main : null,
    color: "white",
  },
  resultCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.main : null,
    color: theme.palette.type === "dark" ? "white": null,
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
  skeleton: {
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    marginLeft: "auto",
    marginRight: "auto",
  },
  overflowText: {
    overflow: "auto",
  },
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
                        <Typography variant="h6">{value.name}</Typography>
                        <Typography variant="subtitle1">
                          {value.description}
                        </Typography>
                        {value.from ? (
                          <>
                            <Typography color="secondary" variant="subtitle2">
                              {`From step: ${value.from.split(":")[0]}`}
                            </Typography>
                            <Typography color="secondary" variant="subtitle2">
                              {`Output: ${value.from.split(":")[1]}`}
                            </Typography>
                          </>
                        ) : null}
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
                      <Typography variant="h6">{value.name}</Typography>
                      <Typography variant="subtitle1">
                        {value.description}
                      </Typography>
                      {value.from ? (
                        <>
                          <Typography color="secondary" variant="subtitle2">
                            {`From step: ${value.from.split(":")[0]}`}
                          </Typography>
                          <Typography color="secondary" variant="subtitle2">
                            {`Output: ${value.from.split(":")[1]}`}
                          </Typography>
                        </>
                      ) : null}
                      <Divider className={classes.divider} />
                      <Typography
                        className={classes.overflowText}
                        component="pre"
                        paragraph
                      >
                        {cardData}
                      </Typography>
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
            : [...Array(3)].map((val, index) => (
                <Skeleton
                  key={index}
                  className={classes.skeleton}
                  variant="rect"
                  width={"100%"}
                  height={150}
                />
              ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobResults;
