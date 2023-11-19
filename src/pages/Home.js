import {
  Button,
  Typography,
  makeStyles,
  Tooltip,
  Grid,
  Container,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(14),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.5rem",
    },
  },
  subtitle: {
    maxWidth: "350px",
    marginBottom: theme.spacing(5),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(2),
  },
  highlight: {
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  grow1: {
    flexGrow: 1,
  },
}));

function Home() {
  const classes = useStyle();

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1" className={classes.title}>
              M2P
            </Typography>
            <Typography className={classes.subtitle}>
              Gather relevant and objective data about your media materials
              throught one of M2P's
              <Tooltip title="Add description" aria-label="pipeline">
                <Typography
                  component="span"
                  className={classes.highlight}
                  color="primary"
                  display="inline"
                >
                  {" "}
                  workflows
                </Typography>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid container>
            <Grid item className={classes.grow1} />
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/pipelines"
              >
                Select a workflow
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
