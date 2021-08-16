import {
  StepLabel,
  Stepper,
  Step,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";
import PipelineResultsPreview from "./PipelineResultsPreview";
import PipelineStepsPreview from "./PipelineStepsPreview";

const useStyle = makeStyles((theme) => ({
  field: {
    textDecoration: "none",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "30px",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
  },
  stepper: {
    borderRadius: "30px",
    width: "90%",
    margin: "auto",
  },
  step: {
    color: "red",
  },
  grow1: {
    flexGrow: 1,
  },
}));

function PipelineOption({ option }) {
  const classes = useStyle();
  const steps = ["Input", "Process", "Output"];
  return (
    <>
      <Accordion className={classes.field}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls={option.id} //TODO
          id={option.id} //TODO
        >
          <Typography className={classes.heading}>{option.name}</Typography>
          <Typography className={classes.secondaryHeading}>
            {option.description}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} className={classes.grid} >
            <Grid item xs={12}>
              <PipelineStepsPreview pipeline={option} />
            </Grid>
            <Grid item xs={12}>
              <PipelineResultsPreview pipeline={option} />
            </Grid>
            <Grid item className={classes.grow1}/>
            <Grid item>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to={`/pipelines/${option.id}`}
            >
              Select
            </Button>

            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default PipelineOption;
