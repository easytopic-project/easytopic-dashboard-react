import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  status: {
    width: "max-content",
    padding: "3px 10px 0px 10px",
    borderRadius: "20px",
  },
  done: {
    backgroundColor: "green",
  },
  waiting: {
    backgroundColor: "yellow",
    color: "black",
  },
  failed: {
    backgroundColor: "red",
  },
  center: {
    margin: "auto",
  }
}));

function Status({ children, color, center }) {
  const classes = useStyle();

  return (
    <div className={`${classes.status} ${classes[color]} ${center ? classes.center : null}`}>{children}</div>
  );
}

export default Status;
