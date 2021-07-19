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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";
	

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
    justifyContent: "space-between",
    display: "block",
  },
  stepper: {
    borderRadius: "30px",
    width: "90%",
    margin: "auto",
  },
  step: {
    color: "red",
  },
  button: {
    marginTop: "20px",
    marginLeft: "85%",
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
        <AccordionDetails className={classes.details}>
          <div>
            <Stepper activeStep={null} className={classes.stepper}>
              {steps.map((label, index) => (
                <Step key={label} className={classes.step}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              component={Link}
              to={`/pipelines/${option.id}`}
            >
              Select
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default PipelineOption;
